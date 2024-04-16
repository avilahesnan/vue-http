<template>
    <div>
        <div class="row">
            <div class="col-sm-10">
                <h1 class="font-weight-light">Lista de Tarefas</h1>
            </div>
            <div class="col-sm-2">
                <button
                    class="btn btn-primary float-end"
                    @click="exibirFormularioCriar">
                        <i class="fa-solid fa-plus me-2"></i>
                        <span>Criar</span>
                </button>
            </div>
        </div>
        

        <ul class="list-group" v-if="tarefasOrdenadas.length > 0">
            <TarefasListaItem
                v-for="tarefa in tarefasOrdenadas"
                :key="tarefa.id"
                :tarefa="tarefa"
                @editar="selecionadaEdicao"
                @deletar="deletarTarefa"
                @concluir="editarTarefa" />
        </ul>

        <p v-else-if="!mensagemErro">Nenhuma tarefa criada.</p>

        <div class="alert alert-danger" v-else>{{ mensagemErro }}</div>

        <TarefaSalvar
            v-if="exibirFormulario"
            :tarefa="tarefaSelecionada"
            @criar="criarTarefa"
            @editar="editarTarefa" />
    </div>
</template>

<script>

import axios from './../axios'

import TarefaSalvar from './TarefaSalvar'
import TarefasListaItem from './TarefasListaItem'

export default {
    components: {
        TarefaSalvar,
        TarefasListaItem
    },
    data () {
        return {
            tarefas: [],
            exibirFormulario: false,
            tarefaSelecionada: undefined,
            mensagemErro: undefined
        }
    },
    computed: {
        tarefasOrdenadas () {
            return this.tarefas.slice().sort((t1, t2) => {
                if (t1.concluido === t2.concluido) {
                    return t1.titulo < t2.titulo
                        ? -1
                        : t1.titulo > t2.titulo
                            ? 1
                            : 0
                }
                return t1.concluido - t2.concluido
            })
        }
    },
    created () {
        axios.get('/tarefas')
            .then((response) => {
                this.tarefas = response.data
                return 'Olá VueJS!'
            }, error => {
                console.log('Erro capturado no then', error)
                return Promise.reject(error)
            }).catch(error => {
                console.log('Erro capturado no catch', error)
                if (error.response) {
                    this.mensagemErro = `Servidor retornou um erro: ${error.message} ${error.response.statusText}`
                    console.log('Erro [resposta]: ', error.response)
                } else if (error.request) {
                    this.mensagemErro = `Erro ao tentar se comunicar com o servidor: ${error.message}`
                    console.log('Erro [requisição]: ', error.request)
                } else {
                    this.mensagemErro = `Erro ao fazer requisição ao servidor: ${error.message}`
                }
                return 'Olá Axios!'
            }).then(params => {
                console.log('Sempre executado', params)
            })
    },
    methods: {
        criarTarefa (tarefa) {
            // axios.post('/tarefas', tarefa)
            //     .then((response) => {
            //         this.tarefas.push(response.data)
            //         this.resetar()
            //     })
            axios.request({
                method: 'post',
                url: '/tarefas',
                data: tarefa
            }).then((response) => {
                    this.tarefas.push(response.data)
                    this.resetar()
                })
        },
        editarTarefa (tarefa) {
            axios.put(`/tarefas/${tarefa.id}`, tarefa)
                .then(() => {
                    const index = this.tarefas.findIndex(t => t.id === tarefa.id)
                    this.tarefas.splice(index, 1, tarefa)
                    this.resetar()
                })
        },
        deletarTarefa (tarefa) {
            const confirmar = window.confirm(`Deseja deletar a tarefa ${tarefa.titulo}?`)
            if (confirmar) {
                axios.delete(`/tarefas/${tarefa.id}`)
                    .then(() => {
                        const index = this.tarefas.findIndex(t => t.id === tarefa.id)
                        this.tarefas.splice(index, 1)
                    })
            }
        },
        exibirFormularioCriar () {
            if (this.tarefaSelecionada) {
                this.tarefaSelecionada = undefined
                return
            }
            this.exibirFormulario = !this.exibirFormulario
        },
        resetar () {
            this.tarefaSelecionada = undefined
            this.exibirFormulario = false
        },
        selecionadaEdicao (tarefa) {
            this.tarefaSelecionada = tarefa
            this.exibirFormulario = true
        }
    }
}
</script>

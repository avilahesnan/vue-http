<template>
    <div class="mt-4">
        <hr>
        <h2 class="font-weight-light">Salvar tarefa</h2>
        <form @submit.prevent="salvar">
            <div class="row">
                <div :class="classeColuna">
                    <div class="form-group">
                        <label>Título</label>
                        <input
                            type="text"
                            class="form-control"
                            placeholder="Título da tarefa"
                            v-model="tarefaLocal.titulo">
                    </div>
                </div>
                <div class="col-sm-2" v-if="tarefa">
                    <div class="form-group">
                        <label>Tarefa concluída?</label>
                        <button
                            type="button"
                            class="btn btn-sm d-block"
                            :class="classeBotao"
                            @click="tarefaLocal.concluido = !tarefaLocal.concluido">
                            <i class="fa-solid fa-check"></i>
                        </button>
                    </div>
                </div>
            </div>
            <button type="submit" class="btn btn-primary mt-2">Salvar</button>
        </form>
    </div>
</template>

<script>
export default {
    props: {
        tarefa: {
            type: Object,
            default: undefined
        }
    },
    data () {
        return {
            tarefaLocal: Object.assign(
                {},
                { titulo: '', concluido: false },
                this.tarefa
            )
        }
    },
    computed: {
        classeBotao () {
            return this.tarefa && this.tarefaLocal.concluido
                ? 'btn-success'
                : 'btn-secondary'
        },
        classeColuna () {
            return this.tarefa
                ? 'col-sm-10'
                : 'col-sm-12'
        }
    },
    watch: {
        tarefa () {
            this.tarefaLocal = Object.assign({}, this.tarefa)
        }
    },
    methods: {
        salvar () {
            const operacao = !this.tarefa ? 'criar' : 'editar'
            this.$emit(operacao, this.tarefaLocal)
            this.tarefaLocal = { titulo: '', concluido: false }
        }
    }
}
</script>

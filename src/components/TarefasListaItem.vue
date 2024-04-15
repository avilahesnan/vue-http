<template>
    <li class="list-group-item d-flex">
        <span>{{ tarefa.titulo }}</span>
        <span class="espacar"></span>
        <button
            class="btn btn-sm me-4"
            :class="classeCSS"
            :title="tituloBotaoConcluido">
                <i class="fa-solid fa-check"></i>
        </button>
        <button
            class="btn btn-primary btn-sm me-1"
            title="Editar">
                <i class="fa-solid fa-pencil"></i>
        </button>
        <button
            class="btn btn-danger btn-sm"
            title="Deletar">
                <i class="fa-solid fa-trash"></i>
        </button>
    </li>
</template>

<script>
export default {
    props: {
        tarefa: {
            type: Object,
            required: true
        }
    },
    computed: {
        classeCSS () {
            return {
                'btn-secondary': !this.tarefa.concluido,
                'btn-success': this.tarefa.concluido
            }
        },
        tituloBotaoConcluido () {
            return this.tarefa.concluido
                ? 'Refazer Tarefa'
                : 'Concluir Tarefa'
        }
    }
}
</script>

<style scoped>
    .espacar {
        flex: 1 1 auto;
    }
</style>

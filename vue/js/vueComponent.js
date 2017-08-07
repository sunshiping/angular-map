Vue.component('todo-item', {
    props: ['todo'],
    template: '<a class="weui-cell weui-cell_access" href="javascript:;">' +
    '<div class="weui-cell__bd">' +
    '<p>{{todo.text}}</p>' +
    '</div>' +
    '<div class="weui-cell__ft" v-bind:title="todo.text">{{todo.id}}</div>' +
    '</a>'
});
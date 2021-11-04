var vueApp = new Vue({
    el: '#app',
    data: {
        sitename: 'After School Club',
        lessons: [maths,history,science,geography,english,marketing,computer_science,biology,chemistry,art],
        cart:[],
    },

    methods:{

        addToCart: function(){
            const cart = this.scope.vueApp.cart;
            cart.push(this.id);
            this.spaces--;
        },
    },

    computed:{
        // Returns amount of items in cart
        cartItemCount: function(){
            return this.cart.length || '';
        },
        // Disallows to add any more items if the remaining spaces are 0
        canAddToCart: function(){
            return this.product.spaces > 0;
        } 
    }
});
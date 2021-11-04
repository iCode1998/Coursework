var vueApp = new Vue({
    el: '#app',
    data: {
        sitename: 'After School Club',
        cart:[],
        // Creates item
        product: {
            scope: this,
            id: 3377,
            title: 'Maths',
            location: 'London',
            price: 'Price: £100',
            image: "assets/math.png",
            btn: 'Add To Cart',
            spaces: 5,

            // Adds item to cart array and decreases spaces
            addToCart: function(){
                const cart = this.scope.vueApp.cart;
                cart.push(this.id);
                this.spaces--;
            },
        }
    },
    methods:{
        AddToCart: function(){ this.product.addToCart(); }
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
var vueApp = new Vue({
    el: '#app',
    data: {
        sitename: 'After School Club',
        lessons: [maths,history,science,geography,english,marketing,computer_science,biology,chemistry,art],
        cart:[],
    },

    methods:{


        addToCart: function(lesson){
            this.cart.push(this.product[lesson].id)
            this.product[lesson].spaces--;
        },

   // Disallows to add any more items if the remaining spaces are 0
        canAddToCart: function(lesson){
             return this.product[lesson].spaces > 0;
        } 
    },

    computed:{
        // Returns amount of items in cart
        cartItemCount: function(){
            return this.cart.length || '';
        },
        // Disallows to add any more items if the remaining spaces are 0

    }
});
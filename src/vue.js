var vueApp = new Vue({
    el: '#app',
    data: {
        sitename: 'Lessons.com',
        lessons: [maths, history, science, geography, english, marketing, computer_science, biology, chemistry, art],
        cart: [],
        searchBar: "",
        sort: {
            attributes: "price",
            option: "acending",
        },
        showProduct: true,
        name:"",
        phone:"",
        
    },

    methods: {
        // checks if decending or acending option picked 
        // "this.sort.attributes" is the option user wants to sort by. eg price, location,spaces, title
        norml(n) {
            if (n == "decending") {
                this.sortLow(this.sort.attributes)
            }
            else if (n == "acending") {
                this.sortHigh(this.sort.attributes)
            }
        },

        // sort from low to high
        sortHigh(n) {

            // comparing the price of each object within the array 
            // "a" and "b" represents the 2 objects being compared
            if (n == "price") {
                function compare(a, b) {
                    if (a.price > b.price)
                        return -1;
                    if (a.price < b.price)
                        return 1;
                    return 0;
                }
            }
            else if (n == "locations") {
                function compare(a, b) {
                    if (a.locations > b.locations)
                        return -1;
                    if (a.locations < b.locations)
                        return 1;
                    return 0;
                }
            }
            else if (n == "spaces") {
                function compare(a, b) {
                    if (a.spaces > b.spaces)
                        return -1;
                    if (a.spaces < b.spaces)
                        return 1;
                    return 0;
                }
            }
            else if (n == "title") {
                function compare(a, b) {
                    if (a.title > b.title)
                        return -1;
                    if (a.title < b.title)
                        return 1;
                    return 0;
                }
            }
            // sorts the whole array
            return this.lessons.sort(compare);

        },

        // opposite from sorthigh() function
        sortLow(n) {
            if (n == "price") {
                function compare(a, b) {
                    if (a.price > b.price)
                        return 1;
                    if (a.price < b.price)
                        return -1;
                    return 0;
                }
            }
            else if (n == "locations") {
                function compare(a, b) {
                    if (a.locations > b.locations)
                        return 1;
                    if (a.locations < b.locations)
                        return -1;
                    return 0;
                }
            }
            else if (n == "spaces") {
                function compare(a, b) {
                    if (a.spaces > b.spaces)
                        return 1;
                    if (a.spaces < b.spaces)
                        return -1;
                    return 0;
                }
            }
            else if (n == "title") {
                function compare(a, b) {
                    if (a.title > b.title)
                        return 1;
                    if (a.title < b.title)
                        return -1;
                    return 0;
                }
            }
            return this.lessons.sort(compare);

        },

        submitForm() { alert('order submitted!') },

        // determains whether user is on the basket page or main page
        // showProduct is true when user is on the main page and false when user is in basket page
        showCheckout() {
            this.showProduct = this.showProduct ? false : true;
        },

        // reduces number of spaces in lesson and adds it to the cart array
        addToCart: function (lesson) {
            this.cart.push(lesson)
            lesson.spaces--;
   
        },

        // Disallows to add any more items if the remaining spaces are 0
        canAddToCart: function (lesson) {
            return !lesson.spaces == 0;
        },

        // filters product by search 
        // n is the products being  filtered in this case its all the subjects
        filteredProducts: function (n) {
            return n.filter((lessons) => {
                return lessons.title.toLowerCase().match(this.searchBar.toLowerCase());
            });
        },

        //using regular expression to if the inputbox
        check_phone(number) {
            var phone = new RegExp(/^\d+$/);
            return phone.test(number) && number.length == 11;
        },
        
        item_remove(item) {
            for (var i = 0; i < this.lessons.length; i++) {
                if (this.lessons[i].id === this.cart[item].id) {
                    this.lessons[i].spaces++;
                        this.cart.splice(item, 1);
                        break;

                }
            }

        }
        

    },

    computed: {

        // Returns amount of items in cart
        cartItemCount: function () {
            return this.cart.length || '';
        },
    }
});


var vueApp = new Vue({
    el: '#app',
    data: {
        sitename: 'Lessons.com',
        lessons: null,
        cart: [],
        searchBar: "",
        sort: {
            attributes: "price",
            option: "acending",
        },
        showProduct: true,
        name: "",
        phone: "",

    },

    //FETCHES ALL LESSONS FROM GET URL
    
    created: () => {
        fetch("https://md1373.herokuapp.com/collection/Lessons")
          .then((response) => {
            return response.json();
          })
          .then((_lessons) => {
            vueApp.lessons = _lessons;
            console.log(vueApp.lessons.length);
          });
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


        // POSTS (ADDS) ORDER TO ORDER COLLECTION IN MONGODB 

        submitForm() {
            
            for (var i = 0; i < this.cart.length; ++i){

                const orderNew = {                  
                    name: this.name,
                    phone: this.phone,
                    lesson_id: this.cart[i]._id,
                    topic: this.cart[i].topic,
                    space: this.cart[i].space,
                }

            fetch("https://md1373.herokuapp.com/collection/Orders", {
                method: "POST",
                body: JSON.stringify(orderNew),
                headers: {
                  "Content-Type": "application/json",
                },
              }).then((response) => response.json())
            //   .then((res) => {
                this.updateLessonSpaces();
            //   });
               
            }
            
            alert('order submitted!') 
        },

        // UPDATES LESSONS SPACES IN MONGO DB 

        updateLessonSpaces: function () {
            for (var i = 0; i < this.cart.length; ++i){
                console.log(this.cart[i]._id)
            fetch("https://md1373.herokuapp.com/collection/Lessons/" + this.cart[i]._id, {
                method: "PUT",
                body: JSON.stringify({
                    space: this.cart[i].space,
                    // topic: this.cart[i].topic
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then((response) => response.json())
                // .then((res) => {

                  location.reload();
                // });
                } 
                
          },

        // determains whether you r on the basket page or main page
        // showProduct is true when u r on the main page and false when u r on basket page
        showCheckout() {
            this.showProduct = this.showProduct ? false : true;
        },

        // SEARCH 

        filterLesson(){
            if(this.searchBar == "" || this.searchBar == " "){
                fetch("https://md1373.herokuapp.com/collection/Lessons")
                .then((response) => {
                  return response.json();
                })
                .then((_lessons) => {
                  vueApp.lessons = _lessons;
                  console.log(vueApp.lessons.length);
                });
            }else{
            fetch("https://md1373.herokuapp.com/collection/Lessons/search/" + this.searchBar)
            .then((response) => {
              return response.json();
            })
            .then((_lessons) => {
                vueApp.lessons = _lessons;
              console.log(vueApp.lessons.length);
            });
        }
        },

        // reduces number of spaces in lesson and adds it to the cart array
        addToCart: function (lesson) {
            lesson.space--;
            this.cart.push(lesson)

        },

        // Disallows to add any more items if the remaining spaces are 0
        canAddToCart: function (lesson) {
            return !lesson.spaces == 0;
        },



        removeCart: function () {
            for (let j = 0; j < this.cart.length; j++) {
            
            for (let i = 0; i < this.lessons.length; i++) {

                if (this.cart[j].id === this.lessons[i].id) {
                    this.cart.splice(this.cart[j], 1);
                    console.log("remove")
                    this.lessons[i].spaces++;
                    return;

                }
                
            };
        }
    },

        //using regular expression to if the inputbox
        check_phone(number) {
            var phone = new RegExp(/^\d+$/);
            return phone.test(number) && number.length == 11;
        },

    },

    

    computed: {
        cartItemCount: function () {
            return this.cart.length || '';
        },
    }
});
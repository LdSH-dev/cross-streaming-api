
const { createApp } = Vue

const MovieApp = {
    data(){
        return {
            movie: {
                'title': '',
                'url': ''
            },
            movies: []
        }
    },
    async created(){
        await this.getMovies()
    },
    methods: {
        async sendRequest(url, method, data){
            const myHeaders = new Headers({
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            })

            const response = await fetch(url, {
                method: method,
                headers: myHeaders,
                body: data
            })

            return response
        },

        async getMovies(){
            const response = await this.sendRequest(window.location, 'get')
            this.movies = await response.json()
        },

        async createMovie(){
            await this.getMovies()

            await this.sendRequest(window.location + 'create', 'post', JSON.stringify(this.movie))

            await this.getMovies()

            this.movie.title = ''
            this.movie.url   = ''

        },

        async deleteMovie(movie){
            await this.sendRequest(window.location + 'delete', 'post',  JSON.stringify(movie))

            await this.getMovies()
        }
    },
    delimiters: ['{', '}']
}

createApp(MovieApp).mount("#app")

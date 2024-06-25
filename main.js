import {ApolloServer} from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import { typeDefs } from "./schema.js"
import { expenses, users } from "./data.js"


const resolvers = {
    Query:{
        users(){
            return users
        },
        expenses(){
            return expenses
        },
        user(parent,args){
            console.log(parent,args)
            const {id} = args
            return users.find(el => el.id == id)
        }
    },
    Expense: {
        user(parent,args){
            return users.find(el => el.id == parent.userId)
        }
    },
    User:{
        expenses(parent){
            return expenses.filter(el => el.id == parent.id)
        }
    },
    Mutation:{
        deleteUser(_,args){
            const { id } = args
            const index = users.findIndex(el => el.id == id)
            if(index == -1) return null
            const user = users.splice(index,1)
            return user[0]
        }
    }
}

const server =  new ApolloServer({
    typeDefs,
    resolvers
})

const { url } =  await startStandaloneServer(server,{listen:3000})

console.log(`server running on ${url}`)
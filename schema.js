export const typeDefs = `#graphql

type User {
    id:ID,
    name:String,
    age:Int,
    expenses:[Expense]
}

type Expense {
    id: ID,
    cost:Int,
    description:String
    user:User
}

type Query {
    users:[User]
    expenses:[Expense]
    user(id:ID!):User
}

type Mutation{
    deleteUser(id:ID!):User
}

`;

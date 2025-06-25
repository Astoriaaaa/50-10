import { Client, Account, OAuthProvider } from 'appwrite'

const client = new Client()
client
  .setEndpoint('https://nyc.cloud.appwrite.io/v1')
  .setProject('685b1552003c8b80f35d')

const account = new Account(client);

export { account, OAuthProvider }
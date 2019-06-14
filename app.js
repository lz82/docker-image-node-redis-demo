const Koa = require('koa')
const redis = require('redis')
const client = redis.createClient({
    host:  process.env.redis_server || '127.0.0.1',
    port: 6379,
    db: 0
})

client.on('error', err => {
    console.log(err)
})

client.info((err, res) => {
    if (err) console.log(err)
    console.log(res)
})


const app = new Koa()

app.use(async (ctx, next) => {
    client.incr('cnt')
    
    try {
        const cnt = await new Promise((resolve, reject) => {
            client.get('cnt', (err, res) => {
                if (err) {
                    console.log(err)
                    reject(err)
                } else {
                    resolve(res)
                }
            })
        })
        ctx.body = `hello docker ${cnt}`
    } catch (err) {
        console.log(err)
        ctx.body = `ooooops~~${err}`
    }
    
})


console.log('server is runing at port:8088')
app.listen('8088')
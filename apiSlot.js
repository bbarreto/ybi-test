const express = require('express')
const router = express.Router()
const randomstring = require('randomstring')
const redis = require('then-redis')

const redisClient = redis.createClient(process.env.REDIS_URL, {
  retry_strategy: function (options) {
    if (options.error && options.error.code === 'ECONNREFUSED') {
      return new Error('The REDIS server refused the connection');
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      return new Error('Retry redis time exhausted');
    }
    if (options.attempt > 10) {
      return undefined;
    }

    return Math.min(options.attempt * 100, 3000);
  }
});

redisClient.on("error", function (err) {
    console.log("Error " + err);
});

redisClient.on("ready", () => {
  console.log("redis ready")
})

router.get('/start', (req, res) => {
  // Create a new session (wallet) with 20 coins
  let sessionId = randomstring.generate()

  // Create wallet that expires in 1 hour
  redisClient.set("wallet_"+sessionId, 20)
    .then(success => {
      return res.status(200).send({
        sessionId
      })
    })
    .catch(err => {
      return res.status(500).send({
        error: err.message
      })
    })
})

router.get('/balance', (req, res) => {
  if (!req.query.wallet) {
    return res.status(400).send({
      error: 'Please, inform wallet'
    })
  }

  redisClient.get("wallet_"+req.query.wallet)
    .then(data => {
      return res.status(200).send(data)
    })
    .catch(err => {
      return res.status(500).send({
        error: err.message
      })
    })
})

router.get('/spin', async (req, res) => {
  if (!req.query.wallet) {
    return res.status(400).send({
      error: 'Please, inform wallet'
    })
  }

  // Get balance from database
  let balance = await redisClient.get("wallet_"+req.query.wallet)

  // Return message if user has no balance
  if (balance < 1) {
    return res.status(400).send({
      error: 'Insuficient balance.',
      balance
    })
  }

  // Define reels items
  let reels = [
    ["cherry", "lemon", "apple", "lemon", "banana", "banana", "lemon", "lemon"],
    ["lemon", "apple", "lemon", "lemon", "cherry", "apple", "banana", "lemon"],
    ["lemon", "apple", "lemon", "apple", "cherry", "lemon", "banana", "lemon"]
  ]

  let round = []
  let prize = 0

  // Pick one item for each reel
  reels.forEach((reel, k) => {
    round.push(reels[k][Math.floor(Math.random() * 8)]);
  })

  // Determine prizes
  if (
    // 3 cherries in a row: won 50 coins
    round[0] === 'cherry' &&
    round[1] === 'cherry' &&
    round[2] === 'cherry'
  ) {
    prize = 50
  } else if (
    // 2 cherries in a row: won 40 coins
    round[0] === 'cherry' && round[1] === 'cherry' ||
    round[1] === 'cherry' && round[2] === 'cherry'
  ) {
    prize = 40
  } else if (
    // 3 Apples in a row: won 20 coins
    round[0] === 'apple' &&
    round[1] === 'apple' &&
    round[2] === 'apple'
  ) {
    prize = 20
  } else if (
    // 2 Apples in a row: won 10 coins
    round[0] === 'apple' && round[1] === 'apple' ||
    round[1] === 'apple' && round[2] === 'apple'
  ) {
    prize = 10
  } else if (
    // 3 Bananas in a row: won 15 coins
    round[0] === 'banana' &&
    round[1] === 'banana' &&
    round[2] === 'banana'
  ) {
    prize = 15
  } else if (
    // 2 Bananas in a row: won 5 coins
    round[0] === 'banana' && round[1] === 'banana' ||
    round[1] === 'banana' && round[2] === 'banana'
  ) {
    prize = 5
  } else if (
    // 3 lemons in a row: won 3 coins
    round[0] === 'lemon' &&
    round[1] === 'lemon' &&
    round[2] === 'lemon'
  ) {
    prize = 3
  }

  // Calculate new balance
  balance = parseInt(balance) + prize - 1

  // Save balance to database
  redisClient.set("wallet_"+req.query.wallet, balance)
    .then(success => {
      // Return result to user
      return res.status(200).send({
        round,
        prize,
        balance
      })
    })
    .catch(err => {
      // Return error if we cannot save data
      return res.status(500).send({
        error: err.message
      })
    })

})

module.exports = router

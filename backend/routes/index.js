const router = require( 'express' ).Router()

router.use( "/affirmations", require( "./affirmationRoutes" ) )
router.use( "/users", require( "./userRoutes" ) )

module.exports = router
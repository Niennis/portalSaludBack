import { OAuth2Client } from "google-auth-library";

const getUserData = async (access_token) => {
  const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`)
  const data = await response.json()
  return data
}

export const oauth = async (req, res, next) => {
  const code = req.query.code
  try {
    const redirectUrl = 'http://localhost:3010/oauth'
    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectUrl
    )
    const response = await oAuth2Client.getToken(code)
    await oAuth2Client.setCredentials(response.tokens)
    console.log('TOKENS ACQUIRED');
    const user = oAuth2Client.credentials
    console.log('CREDENTIALS', user)
    const dataUser = await getUserData(user.access_token)
    console.log('DATA USER', dataUser);
    // res.json(dataUser)

  } catch (err) {
    console.log('Error with signing in with Google', err);
  }
}
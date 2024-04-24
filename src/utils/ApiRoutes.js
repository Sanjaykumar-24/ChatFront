export const HOST = "https://whatsappclone-l9ub.onrender.com";

const AUTH_ROUTE = `${HOST}/api/auth`;
const MESSAGES_ROUTE = `${HOST}/api/messages`

export const CHECK_USER_ROUTE = `${AUTH_ROUTE}/check-user`;
export const ONBOARD_USER_ROUTE = `${AUTH_ROUTE}/onboard-user`
export const GET_ALL_CONTACTS = `${AUTH_ROUTE}/get-contacts`
export const ADD_MESSAGE_ROUTE = `${MESSAGES_ROUTE}/add-message`
export const GET_MESSAGES_ROUTE = `${MESSAGES_ROUTE}/get-messages`
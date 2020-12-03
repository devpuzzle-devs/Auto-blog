import User from "../models/user";
import jwt_decode from 'jwt-decode';

export async function getUserByToken(token) {
    const {hash} = jwt_decode(token);
    try {
        var user = await User.findOne({hash}, {password: 0});  //Нашли юзера по hash и убрали с него пароль
    } catch (e) {
        throw e;
    }
    return user;
}


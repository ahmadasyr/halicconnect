import { supabase } from "./supabase";

export const listUsers = async () =>{
    const {data, error} = await supabase
    .from('user')
    .select('*');
    return {data, error}
}

export const getUserID = async () =>{
    const auth = await supabase
    .auth
    .getSession()
    const {data, error} = await supabase
    .from('user')
    .select('id')
    .eq('auth_id', auth.data.session.user.id);
    if(error){
        console.log(error)
    }else{
        return data[0].id;
    }
}

export const getUserInfo = async () => {
  const auth = await supabase
    .auth
    .getSession()
    const {data, error} = await supabase
    .from('user')
    .select('*')
    .eq('auth_id', auth.data.session.user.id);
    if(error){
        console.log(error)
    }else{
        return data[0];
    }
}

export const getStudentInfo = async (id) => {
    const {data, error} = await supabase
    .from('user')
    .select('*')
    .eq('id', id);
    if(error){
        console.log(error)
    }else{
        return data[0];
    }
}

export const getMessages = async (chat_id) => {
    const {data, error} = await supabase
    .from('message')
    .select('*')
    .eq('chat_id', chat_id.id);
    if(error){
        console.log(error)
    }else{
        return data
    }
}

export const getChat = async (id) => {
    try {
      const selfId = await getUserID();
      const { data: chatData } = await supabase
        .from('chat')
        .select('id')
        .eq('user1_id', selfId)
        .eq('user2_id', id);
  
      if (chatData.length > 0) {
        return chatData[0];
      }
  
      const { data: chatData2 } = await supabase
        .from('chat')
        .select('id')
        .eq('user1_id', id)
        .eq('user2_id', selfId);
  
      if (chatData2.length > 0) {
        return chatData2[0];
      }
  
      const { data: newChatData, error } = await supabase
        .from('chat')
        .insert({
          user1_id: selfId,
          user2_id: id,
        })
        .select('id');
  
      if (error) {
        console.log(error);
      } else {
        return newChatData[0];
      }
    } catch (error) {
      console.log(error);
    }
  };
  

export const sendMessage = async (chat_id, message) => {
    const selfId = await getUserID();
    const {data, error} = await supabase
    .from('message')
    .insert({
        user_from_id: selfId,
        chat_id: chat_id.id,
        message,
    })
}
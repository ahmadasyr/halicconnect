import { supabase } from "./supabase";

export const login = async (info) => {
  let { data, error } = await supabase.auth.signInWithPassword(info);
  console.log({ data, error });
  return { data, error };
};

export const signup = async (info) => {
  let { data, error } = await supabase.auth.signUp({
    email: info?.email,
    password: info?.password,
  });
  if (data) {
    let auth_id = data?.user?.id;
    let meta = await supabase.from("user").insert({
      id: info?.id,
      first_name: info?.firstname,
      last_name: info?.lastname,
      auth_id,
      student_email: info?.email,
      phone: info?.phone,
      department: info?.department,
      faculty: info?.faculty,
      dateofbirth: info?.date
    });
  }

  return { data, error };
};

export const logout = async () => {
  const logout = await supabase.auth.signOut();
  window.location.href = '/';
};

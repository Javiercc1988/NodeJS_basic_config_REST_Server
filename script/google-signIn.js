function handleCredentialResponse(response) {
  // GOOGLE token : ID_Token
  //    console.log('id_token:', response.credential)

  const body = { id_token: response.credential };

  fetch("http://localhost:8080/api/auth/google", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((resp) => resp.json())
    .then((resp) => {
      console.log(resp);
      localStorage.setItem("email", resp.usuario.correo);
    })
    .catch(console.warn);
}

const SignOut = document.querySelector("#google_signOut");
SignOut.onclick = () => {
  console.log(google.accounts.id);
  google.accounts.id.disableAutoSelect();
  google.accounts.id.revoke(localStorage.getItem("email"), (done) => {
    localStorage.clear();
    location.reload();
  });
};

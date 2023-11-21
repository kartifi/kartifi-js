import { redirect } from "react-router-dom";
import config from "../../config";

export let NewOptionRoute = {
  path: "options/new",


  action: async ({ request }) => {
    (request);

    let formData = await request.formData();
    let data = JSON.stringify(Object.fromEntries(formData));


    let optionData = await fetch(config.BASE_URL + "/options", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: data
    })

    return await optionData.json();

    // return redirect(`/products/new?action=new&model=option&id=${option.id}&key=${option.key}&value=${option.value}`);
    return null;
  }
}
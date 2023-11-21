import config from "../../config";

const keys = ["title", "description", "price", "salePrice", "images"];

export let NewVariantRoute = {
  path: "variants/new",


  action: async ({ request }) => {
    (request);

    let formData = await request.formData();
    let variantOptions = [];
    for (let [key, value] of formData.entries()) {
      if (!keys.includes(key)) {
        let variantOption = await fetch(config.BASE_URL + "/variant-options", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title: key,
            value: value
          })
        });
        variantOptions.push(await variantOption.json());
        formData.delete(key);


      }
    }

    formData.append("options", JSON.stringify(variantOptions));


    let optionData = await fetch(config.BASE_URL + "/variants", {
      method: "POST",
      body: formData
    })

    return await optionData.json();

  }
}
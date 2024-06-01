// Initialise Supabase client
const client = supabase.createClient("https://xargcmjbcxmattsksdea.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhcmdjbWpiY3htYXR0c2tzZGVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4NTAzNzksImV4cCI6MjAyNTQyNjM3OX0.T47bweSbghclCg34gCc7-qFOSJML3k8MoQgvpqA1IXM");
const bucketUrl = "https://xargcmjbcxmattsksdea.supabase.co/storage/v1/object/public/logos/";

const country_select = document.getElementById("country_select");
const investor_list = document.getElementById("investor_list");

const default_content = `<img src="img/spinner.svg" alt="" width="24" height="24" />`;

window.addEventListener("DOMContentLoaded", async (event) => {
  await getList();
});

async function drawData(data) {
  console.log(data);
  investor_list.innerHTML = default_content;
  let content = "";

  data.forEach((vc) => {
    let links = vc.links;
    let investingSectors = "";
    investingStage = vc.investing_stage.map((stage) => `<span class="badge rounded-pill text-bg-secondary">${stage}</span>`).join("");
    investingSectors = vc.investing_sectors.map((sector) => `<span class="badge rounded-pill text-bg-secondary">${sector}</span>`).join("");
    content += `
        <li class="list-group-item d-flex flex-sm-row flex-column">
          <div class="d-flex flex-sm-row flex-column col-md-5">
          ${vc.logo_url != null ? `<img class="border border-secondary-subtle rounded me-2" src="${bucketUrl}${vc.logo_url}" alt="${vc.fund_name}" width="48" height="48" />` : `<img class="border border-secondary-subtle rounded me-2" src="img/logo-placeholder.svg" alt="${vc.fund_name}" width="48" height="48" />`}
            <div class="d-flex flex-column">
            <h5 class="m-0">${vc.fund_name}</h5>
              <div class="d-flex">
                  ${
                    links.website != ""
                      ? `<a class="me-2" href="${links.website}" target="_blank">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm88,104a87.62,87.62,0,0,1-6.4,32.94l-44.7-27.49a15.92,15.92,0,0,0-6.24-2.23l-22.82-3.08a16.11,16.11,0,0,0-16,7.86h-8.72l-3.8-7.86a15.91,15.91,0,0,0-11-8.67l-8-1.73L96.14,104h16.71a16.06,16.06,0,0,0,7.73-2l12.25-6.76a16.62,16.62,0,0,0,3-2.14l26.91-24.34A15.93,15.93,0,0,0,166,49.1l-.36-.65A88.11,88.11,0,0,1,216,128ZM40,128a87.53,87.53,0,0,1,8.54-37.8l11.34,30.27a16,16,0,0,0,11.62,10l21.43,4.61L96.74,143a16.09,16.09,0,0,0,14.4,9h1.48l-7.23,16.23a16,16,0,0,0,2.86,17.37l.14.14L128,205.94l-1.94,10A88.11,88.11,0,0,1,40,128Z"></path></svg>
                  </a>`
                      : ""
                  }
                  ${
                    links.twitter != ""
                      ? `<a class="me-2" href="${links.twitter}" target="_blank">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256"><path d="M245.66,77.66l-29.9,29.9C209.72,177.58,150.67,232,80,232c-14.52,0-26.49-2.3-35.58-6.84-7.33-3.67-10.33-7.6-11.08-8.72a8,8,0,0,1,3.85-11.93c.26-.1,24.24-9.31,39.47-26.84a110.93,110.93,0,0,1-21.88-24.2c-12.4-18.41-26.28-50.39-22-98.18a8,8,0,0,1,13.65-4.92c.35.35,33.28,33.1,73.54,43.72V88a47.87,47.87,0,0,1,14.36-34.3A46.87,46.87,0,0,1,168.1,40a48.66,48.66,0,0,1,41.47,24H240a8,8,0,0,1,5.66,13.66Z"></path></svg>
                  </a>`
                      : ""
                  }
                  ${
                    links.facebook != ""
                      ? `<a class="me-2" href="${links.facebook}" target="_blank">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256"><path d="M232,128a104.16,104.16,0,0,1-91.55,103.26,4,4,0,0,1-4.45-4V152h24a8,8,0,0,0,8-8.53,8.17,8.17,0,0,0-8.25-7.47H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,8-8.53A8.17,8.17,0,0,0,167.73,80H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0-8,8.53A8.17,8.17,0,0,0,96.27,152H120v75.28a4,4,0,0,1-4.44,4A104.15,104.15,0,0,1,24.07,124.09c2-54,45.74-97.9,99.78-100A104.12,104.12,0,0,1,232,128Z"></path></svg>
                  </a>`
                      : ""
                  }
                  ${
                    links.linkedin != ""
                      ? `<a class="me-2" href="${links.linkedin}" target="_blank">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256"><path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24ZM96,176a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0ZM88,96a12,12,0,1,1,12-12A12,12,0,0,1,88,96Zm96,80a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140Z"></path></svg>
                  </a>`
                      : ""
                  }
              </div>
            </div>
          </div>
          <div class="d-flex flex-row justify-content-between col-md-7">
            <div class="col-md-5">
              <small class="font-monospace text-uppercase text-secondary">Fund type</small>
              ${vc.fund_type != null ? `<p class="m-0">${vc.fund_type}</p>` : `<p class="text-secondary m-0">Unknown</p>`}
            </div>
            <div class="col-md-5">
              <small class="font-monospace text-uppercase text-secondary">Location</small>
              ${vc.fund_location != null ? `<p class="m-0">${vc.fund_location}</p>` : `<p class="text-secondary m-0">Unknown</p>`}
            </div>
            <div class="col-md-2">
              <button class="btn btn-link" onclick="openDetails(${vc.id})">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208ZM90.34,165.66a8,8,0,0,1,0-11.32L140.69,104H112a8,8,0,0,1,0-16h48a8,8,0,0,1,8,8v48a8,8,0,0,1-16,0V115.31l-50.34,50.35a8,8,0,0,1-11.32,0Z"></path></svg></button>
            </div>
          </div>
        </li>
        `;
  });
  investor_list.innerHTML = content;
}

async function getList() {
  const { data, error } = await client.from("vcs").select("*").limit(100);
  if (data) {
    await drawData(data);
  }
  if (error) {
    console.log(error);
  }
}

country_select.addEventListener("change", async function () {
  const { data, error } = await client.from("vcs").select().eq("fund_location", this.value);
  if (data) {
    await drawData(data);
  }
  if (error) {
    console.log(error);
  }
  let value = this.value;
  console.log(value);
});

const fundName = document.getElementById("modal_vc_name");
const modalLogo = document.getElementById("modal_logo");
const modalLinks = document.getElementById("modal_vc_links");
const fundType = document.getElementById("modal_fund_type");
const fundLocation = document.getElementById("modal_fund_location");
const vcDescription = document.getElementById("modal_vc_description");

async function openDetails(id) {
  const vcModal = new bootstrap.Modal(document.getElementById("vcModal"));
  vcModal.show();

  const { data, error } = await client.from("vcs").select().eq("id", id);
  if (data) {
    fundName.innerHTML = data[0].fund_name;
    if (data[0].logo_url != null) {
      modalLogo.src = bucketUrl + data[0].logo_url;
    }
    let links = "";
    if (data[0].links.website != "") {
      links += `<a href="${data[0].links.website}" class="text-decoration-none me-2" target="_blank">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm88,104a87.62,87.62,0,0,1-6.4,32.94l-44.7-27.49a15.92,15.92,0,0,0-6.24-2.23l-22.82-3.08a16.11,16.11,0,0,0-16,7.86h-8.72l-3.8-7.86a15.91,15.91,0,0,0-11-8.67l-8-1.73L96.14,104h16.71a16.06,16.06,0,0,0,7.73-2l12.25-6.76a16.62,16.62,0,0,0,3-2.14l26.91-24.34A15.93,15.93,0,0,0,166,49.1l-.36-.65A88.11,88.11,0,0,1,216,128ZM40,128a87.53,87.53,0,0,1,8.54-37.8l11.34,30.27a16,16,0,0,0,11.62,10l21.43,4.61L96.74,143a16.09,16.09,0,0,0,14.4,9h1.48l-7.23,16.23a16,16,0,0,0,2.86,17.37l.14.14L128,205.94l-1.94,10A88.11,88.11,0,0,1,40,128Z"></path></svg>
      Website</a>`;
    }
    if (data[0].links.twitter != "") {
      links += `<a href="${data[0].links.twitter}" class="text-decoration-none me-2" target="_blank">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256"><path d="M245.66,77.66l-29.9,29.9C209.72,177.58,150.67,232,80,232c-14.52,0-26.49-2.3-35.58-6.84-7.33-3.67-10.33-7.6-11.08-8.72a8,8,0,0,1,3.85-11.93c.26-.1,24.24-9.31,39.47-26.84a110.93,110.93,0,0,1-21.88-24.2c-12.4-18.41-26.28-50.39-22-98.18a8,8,0,0,1,13.65-4.92c.35.35,33.28,33.1,73.54,43.72V88a47.87,47.87,0,0,1,14.36-34.3A46.87,46.87,0,0,1,168.1,40a48.66,48.66,0,0,1,41.47,24H240a8,8,0,0,1,5.66,13.66Z"></path></svg>
      Twitter</a>`;
    }
    if (data[0].links.linkedin != "") {
      links += `<a href="${data[0].links.linkedin}" class="text-decoration-none me-2" target="_blank">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256"><path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24ZM96,176a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0ZM88,96a12,12,0,1,1,12-12A12,12,0,0,1,88,96Zm96,80a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140Z"></path></svg>
      LinkedIn</a>`;
    }
    modalLinks.innerHTML = links;
    fundType.innerHTML = data[0].fund_type;
    fundLocation.innerHTML = data[0].fund_location;
    if (data[0].description != null) {
      vcDescription.innerHTML = data[0].description;
    } else {
      vcDescription.innerHTML = "N/A";
    }
  }
}

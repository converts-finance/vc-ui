// Initialise Supabase client
const client = supabase.createClient("https://xargcmjbcxmattsksdea.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhcmdjbWpiY3htYXR0c2tzZGVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4NTAzNzksImV4cCI6MjAyNTQyNjM3OX0.T47bweSbghclCg34gCc7-qFOSJML3k8MoQgvpqA1IXM");

window.addEventListener("DOMContentLoaded", async (event) => {
  await getList();
});

async function getList() {
  const { data, error } = await client.from("vcs").select("*");
  if (data) {
    let investor_list = document.getElementById("investor_list");
    let content = "";

    data.forEach((vc) => {
      let links = vc.links;
      let investingSectors = "";
      investingSectors = vc.investing_sectors.map((sector) => `<span class="badge rounded-pill text-bg-secondary">${sector}</span>`).join("");
      content += `
        <li class="list-group-item d-flex flex-wrap justify-content-between">
          <div class="d-flex flex-column col-md-3">
            <small class="font-monospace text-uppercase text-secondary">Fund name</small>
            ${links.website != "" ? `<a href="${links.website}" target="_blank">${vc.fund_name}</a>` : ` <p class="m-0">${vc.fund_name}</p>`}
            <div class="d-flex">
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
          <div class="col-md-3">
            <small class="font-monospace text-uppercase text-secondary">Fund location</small>
            <p class="m-0">${vc.fund_location}</p>
          </div>
          <div class="col-md-3">
            <small class="font-monospace text-uppercase text-secondary">Fund type</small>
            <p class="m-0">${vc.fund_type}</p>
          </div>
          <div class="col-md-3">
            <small class="font-monospace text-uppercase text-secondary">Investing sector</small>
            <p class="m-0">${investingSectors}</p>
          </div>
        </li>
        `;
    });
    investor_list.innerHTML = content;
  }
  if (error) {
    console.log(error);
  }
}

let searchForm = document.querySelector(".search-section");
let search = document.querySelector("[searchData]");
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const wrapper = document.querySelector(".wrapper");
let error = document.querySelector(".error");


searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let userName = search.value;

    if (userName === "")
        return;
    else {
        getData(userName);
        console.log(userName);
    }
});

getData("nikhilharshe");
async function getData(userName) {
    try {
        const result = await fetch(`https://api.github.com/users/${userName}`);

        const data = await result.json();
        // console.log(data);
        if(data.message === "Not Found")
        {
            console.log("data not present");
            error.style.display = "flex";
        }
        else
        {
            error.style.display = "none";
            renderData(data);
        }
    }
    catch {
        // console.log("data not present");
    }
};

function renderData(data) {
    function checkNull(param1)
    {
        if((param1 === "") || (param1 === null))
            return false;
        else
            return true;
    }
    // console.log(data);
    let image = document.querySelector(".Image");
    let Uname = document.querySelector(".name");
    let git = document.querySelector("[GitHubLink]");
    let joinningDate = document.querySelector(".JoinnigDate");
    let dis = document.querySelector(".discription");
    let reposNo = document.querySelector(".reposNo");
    let followNo = document.querySelector(".followNo");
    let followingNo = document.querySelector(".followingNo");
    let location = document.querySelector(".location");
    let page = document.querySelector(".page");
    let twiterrLink = document.querySelector(".twitter");
    let companyN = document.querySelector(".company");
    
    // Uname.innerText = data?.[0]?.login;
    // Uname.innerText = data?.login;
    // Uname.innerText = data?.name;
    // Uname.innerText = data?.id.toFixed(2);
    if (data.message !== "Not Found") {
        Uname.innerText = data.name === null ? data.login : data.name;
        image.src = data.avatar_url; 
        git.innerText = `@${data.login}`;
        git.href = `${data.html_url}`;
        dateSegment = data.created_at.split("T").shift().split("-");
        
        joinningDate.innerText = `Joined ${dateSegment[2]} ${months[dateSegment[1] - 1]} ${dateSegment[0]}`;
        console.log("after git");
        dis.innerText = checkNull(data.bio)? data.bio:"This profile has no bio";
        reposNo.innerText = data.public_repos;
        followNo.innerText = data.followers;
        followingNo.innerText = data.following;

        location.innerText = checkNull(data.location) ? data.location: "Not present";

        page.innerText = checkNull(data.blog) ? data.blog: "Not Available";
        page.href = checkNull(data.blog) ? data.blog: "#";

        twiterrLink.innerText = checkNull(data.twitter_username) ? data.twitter_username : "Not Available";
        twiterrLink.href = checkNull(data.twitter_username) ? `https://twitter.com/${data.twitter_username}` : "#";
        
        companyN.innerText = checkNull(data.company) ? data.company : "Not Available";

    }

}

let lightBtn = document.querySelector(".lightBtn");
let darkBtn = document.querySelector(".darkBtn");
let body = document.querySelector("body");
let Htext = document.querySelector(".Htext");
let lighttext = document.querySelector(".lighttext");
let searchSection = document.querySelector(".search-section");
let inputTag = document.querySelector(".inputTag");
const root = document.documentElement.style;

let locationImg = document.querySelector(".locationImg");
let pageImg = document.querySelector(".pageImg");
let twitterImg = document.querySelector(".twitterImg");
let companyImg = document.querySelector(".companyImg");


lightBtn.addEventListener('click' , lightmode)
darkBtn.addEventListener('click' , darkmode)

function lightmode()
{
    // body.style.background="#f6f8ff";
    // searchSection.style.background="white";
    // Htext.style.color = "#1e2a47b6";
    // inputTag.style.color = "#1e2a47b6";
    // inputTag.placeholder.classList.add("active");
    root.setProperty("--lm-bg-content", "#1E2A47");
    root.setProperty("--lm-bg", "white");
    root.setProperty("--bg-dark", "#f6f8ff");
    // root.setProperty("--dark-text", "#1e2a47b6");
    root.setProperty("--dark-text", "#1f2f54b6");
    root.setProperty("--tx-bio", "#8d8dc3");

    locationImg.src = `./assets/images/location-icon.svg`;
    locationImg.style.cssText = "width:15px; height:20px";
    pageImg.src = `./assets/images/website-icon.svg`;
    pageImg.style.cssText = "width:20px; height:20px";
    twitterImg.src = `./assets/images/twitter-icon.svg`;
    twitterImg.style.cssText = "width:20px; height:20px";
    companyImg.src = `./assets/images/company-icon.svg`;
    companyImg.style.cssText = "width:20px; height:20px";

    lightBtn.style.display = "none";
    darkBtn.style.display = "flex";

    console.log("click on light mode");
}

function darkmode()
{
    root.setProperty("--lm-bg-content", "#fefefe");
    root.setProperty("--lm-bg", "#1E2A47");
    root.setProperty("--bg-dark", "#141D2F");
    root.setProperty("--dark-text", "#fefefe");
    root.setProperty("--tx-bio", "#c6c6d7");

    locationImg.src = `./assets/lightImages/icons8-location-50.png`;
    locationImg.style.cssText = "width:20px; height:20px";
    pageImg.src = `./assets/lightImages/icons8-link-64.png`;
    pageImg.style.cssText = "width:24px; height:24px";
    twitterImg.src = `./assets/lightImages/icons8-twitter.svg`;
    twitterImg.style.cssText = "width:25px; height:31px";
    companyImg.src = `./assets/lightImages/icons8-company-64.png`;
    companyImg.style.cssText = "width:20px; height:22px";

    lightBtn.style.display = "flex";
    darkBtn.style.display = "none";

    console.log("click on dark mode");
}


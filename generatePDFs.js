const fs = require("fs");
const puppeteer = require("puppeteer");
const { excelData, peerResponsesData, ratingsData, stlData } = require("./Readexcel.js");
function generateStars(rating) {
  const numStars = parseInt(rating);
  const starIcon = "★";
  const stars = starIcon.repeat(numStars);
  return stars;
}
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const cssContent = fs.readFileSync("generatePDFs.css", "utf-8");

  const questionList = [
    'How would you rate the team member on "Customer Obsession"? Any action or initiative should always aim to improve customer trust and should be taken keeping customer interest in mind. A rating of 1 signifies the team member doesn\'t think with a customer-first approach. A rating of 5 means the team member always thinks customer first, and all his actions are aligned keeping the best interest of the customers in mind.',
    'Highlight a few instances of why you gave the team member a particular rating in "Customer Obsession". The question is meant to make you think about why you gave someone a rating in the "Customer Obsession" value. You might feel someone is a 3, thinking deeply and putting down instances will help you realize what you rated is actually right.',
    'How would you rate the team member on their "Bias for Action" As an early-stage company, it is do-or-die for us to get things done. The "Bias for Action" value measures this. 1 on the scale means the team member you are rating needs to be pushed to get their things out and doesn\'t take initiative themselves. 3 on the scale would mean they get their work done by themselves and that\'s it. A rating of 5 means the team member not only gets their work done but also takes initiative and fixes whatever and wherever they feel something is not right',
    'Highlight a few instances of why you gave the team member a particular rating in "Bias For Action" The question is meant to make you think about why you gave someone a rating in the "Bias for Action" value. Thinking deeply and putting down instances will help you realize what you rated is actually right.',
    'How would you rate the team member on "Insisting on Highest Standards"* Processes, products, and services with new and recurring defects will fail. "Insisting on Highest Standards" ensures what we build stays. It means ensuring defects don\'t get sent down the line and those once fixed remain fixed. A rating of 1 means the team member builds things that are not up to standard and with defects. A rating of 3 means what the team member builds is defect free. A rating of 5 means the team member ensures things are defect-free not just in what he does but also in whatever the team is building.',
    'Highlight a few instances of why you gave the team member a particular rating on "Insisting on Highest Standards". The question is meant to make you think about why you gave someone a rating on the "Insisting on Highest Standards" value.',
    'How would you rate the team member on "Ownership" One of the key tenets to building a successful team is "Ownership". You\'ll never need to follow up on a task with an Owner. Team members are expected to own and drive initiatives tagged to them. Owners act on behalf of the entire company, beyond just their own team. "That’s not my job" is something they\'ll never say. A rating of 1 would mean the team member is a Renter, not an Owner, they\'ll try to move things away from them and think short term. A rating of 5 would mean the team member never shies away from any task, anything that\'s tagged to them gets done.',
    'Highlight a few instances of why you gave the team member a particular rating on "Ownership".  The question is meant to make you think about why you gave someone a rating on the "Ownership" value.',
    "What should this person do differently?",
  ];
  for (const data of excelData) {
    const email = "priyamvada@growsimplee.com";
    
    const selfData = excelData.filter(res => res["Email address"] === email);
    const stlValues = stlData.map(res => res.STLs);

    const userData = peerResponsesData.filter(
      res => res["E-mail Id of the team member you are filling this form for Please enter full e-mail Id: Example hr@blitznow.in"] === email
      );
    const ratingsData2 = ratingsData.filter((res) => res["Email address"] === email);
    let name = "";
    name = selfData.map(res => res["name"]);
    name = name[0];
    let sum1 = 0,
      sum2 = 0,
      sum3 = 0,
      sum4 = 0;
    let sum5 = 0.0;
    // let ignore_count = 0;
    userData.map(res => {
      // console.log(parseFloat(res['Ignore Flag']))
      // ignore_count = ignore_count + ((parseFloat(res['Ignore Flag']) === 0 || res['Ignore Flag'] === true) ? 1:0);
      // console.log(ignore_count);
      // sum1 = sum1 + ((parseFloat(res['Ignore Flag']) === 0 || res['Ignore Flag'] === true) ? 0 : parseFloat(res['How would you rate the team member on "Customer Obsession"? Any action or initiative should always aim to improve customer trust and should be taken keeping customer interest in mind. A rating of 1 signifies the team member doesn\'t think with a customer-first approach. A rating of 5 means the team member always thinks customer first, and all his actions are aligned keeping the best interest of the customers in mind.']));
      // console.log(sum1);
      sum1 = sum1 + parseFloat(res['How would you rate the team member on "Customer Obsession"? Any action or initiative should always aim to improve customer trust and should be taken keeping customer interest in mind. A rating of 1 signifies the team member doesn\'t think with a customer-first approach. A rating of 5 means the team member always thinks customer first, and all his actions are aligned keeping the best interest of the customers in mind.']);
      (sum2 =
        sum2 + parseFloat(res['How would you rate the team member on their "Bias for Action" As an early-stage company, it is do-or-die for us to get things done. The "Bias for Action" value measures this. 1 on the scale means the team member you are rating needs to be pushed to get their things out and doesn\'t take initiative themselves. 3 on the scale would mean they get their work done by themselves and that\'s it. A rating of 5 means the team member not only gets their work done but also takes initiative and fixes whatever and wherever they feel something is not right'])),
        (sum3 =
          sum3 +
          parseFloat(
            res['How would you rate the team member on "Insisting on Highest Standards"* Processes, products, and services with new and recurring defects will fail. "Insisting on Highest Standards" ensures what we build stays. It means ensuring defects don\'t get sent down the line and those once fixed remain fixed. A rating of 1 means the team member builds things that are not up to standard and with defects. A rating of 3 means what the team member builds is defect free. A rating of 5 means the team member ensures things are defect-free not just in what he does but also in whatever the team is building.']
          )),
        (sum4 = sum4 + parseFloat(res['How would you rate the team member on "Ownership" One of the key tenets to building a successful team is "Ownership". You\'ll never need to follow up on a task with an Owner. Team members are expected to own and drive initiatives tagged to them. Owners act on behalf of the entire company, beyond just their own team. "That’s not my job" is something they\'ll never say. A rating of 1 would mean the team member is a Renter, not an Owner, they\'ll try to move things away from them and think short term. A rating of 5 would mean the team member never shies away from any task, anything that\'s tagged to them gets done.']));
    });
    // sum1 = (sum1 / (userData.length- ignore_count)).toFixed(2);
    // sum2 = (sum2 / (userData.length- ignore_count)).toFixed(2);
    // sum3 = (sum3 / (userData.length- ignore_count)).toFixed(2);
    // sum4 = (sum4 / (userData.length- ignore_count)).toFixed(2);
    sum1 = (sum1 / userData.length).toFixed(2);
    sum2 = (sum2 / userData.length).toFixed(2);
    sum3 = (sum3 / userData.length).toFixed(2);
    sum4 = (sum4 / userData.length).toFixed(2);

    const averageOfSums =
      (parseFloat(sum1) + parseFloat(sum2) + parseFloat(sum3) + parseFloat(sum4)) / 4;
    const averageOfSumsRounded = averageOfSums.toFixed(2);

    const value1 = Math.max(...ratingsData2.map(res => res["CO_1"]));
    const value2 = Math.max(...ratingsData2.map(res => res["BA_1"]));
    const value3 = Math.max(...ratingsData2.map(res => res["IHS_1"]));
    const value4 = Math.max(...ratingsData2.map(res => res["Own_1"]));
    const maxOfValues = Math.max(value1, value2, value3, value4);
  
    let varName ="";
    if (maxOfValues === value1) {
      varName = "Customer Obsession";
    } else if (maxOfValues === value2) {
      varName = "Bias for Action";
    } else if (maxOfValues === value3) {
      varName = "Insisting on Highest Standards";
    } else if (maxOfValues === value4) {
      varName = "Ownership";
    }
    console.log(varName);
    let meaning = "";
    
    meaning = ratingsData2.map(res => res["PR Conclusion"]);
    const performanceMetrics = {
      "Customer Obsession": ratingsData2.map(res => res["CO"]),
      "Bias for Action": ratingsData2.map(res => res["BA"]),
      Ownership: ratingsData2.map(res => res["Own"]),
      "Insisting on Highest Standards":
       ratingsData2.map(res => res["IHS"]),
      Cumulative: parseFloat(ratingsData2.map(res => res["SR Total"])).toFixed(2),
    };
    function calculateAverageRatings(data) {
      const ratings = [
        parseFloat(data["Customer Obsession"]),
        parseFloat(data["Bias for Action"]),
        parseFloat(data["Ownership"]),
        parseFloat(data["Insisting on Highest Standards"]),
      ];
      const total = ratings.reduce((sum, rating) => sum + rating, 0);
      const average = total / ratings.length;
      return average.toFixed(2);
    }
    const cumulativeRating = calculateAverageRatings(performanceMetrics);
    const columnsToExclude = [
      "E-mail Id of the team member you are filling this form for",
      "Timestamp",
      "Email address",
      "name",
    ];
    
    const selfResponseQuestions = selfData[0] ? Object.keys(selfData[0]).filter(
      columnName => !columnsToExclude.includes(columnName)
    ) : [];
    
    
    const selfRating = calculateAverageRatings(data);
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head class="header">
        <title>${email} - Peer Responses</title>
        <link rel="stylesheet" type="text/css" href="generatePDFs.css">
      </head>
      <body>
   
      <h1 class ="prl">PERFORMANCE REVIEW LETTER</h1>
      <h3 class ="prl2">H2'23</h3>
     
      
      <p>To,</p>
      <p>${name}</p>
      <p>Date : 31st Aug 2023</p>
      <p class="op">Overall Performance :<span style="color:blue"> ${ratingsData2.map(res => res["PR Conclusion"])}</p>
      <p class="pr">We are pleased to extend this performance letter for your commitment towards our mission to achieve Same-Day Delivery in India. You have performed with utmost<span style="font-weight:bold"> ${varName}</span> and have raised the bar to work backwards to meet the customer needs.
      <p>
      We truly believe in challenging the status quo of the eCommerce brands. The way to do this is by building scalable technology, low-cost infrastructure & easy to use products that we’re proud to recommend to our friends & family.
      </p>
      <p class="pr">
      Market is changing rapidly, that means the user behavior is also changing. The only way to win in this rapidly changing environment is by consistently innovating & solving the  problems of our customers. 
      </p>
      <p class="pr">
      Since inception we’ve worked upon numerous products & Same-Day Delivery is the one of the few products that we’re proud of & believe that we’ll innovate & further launch new products. The larger impact would touch 10,000+ brands by enabling them faster deliveries & empowering 10,000+ micro-entrepreneurs (franchises) providing livelihood to 1,00,000+ delivery partners. 
      </p>
      <p>
      Let’s be the most customer centric company on this earth.
      </p>
      <p>
      Mayank Varshney
      </p>
      Co-founder & CEO,
      </p>
      <p>
      Blitz
      </p>
      
      </p>
     
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>

   
    <h1 class="self-evaluation">SELF EVALUATION RESULTS:</h1>
        <table>
          <tr class="blue">
            <th></th>
            <th>Customer Obsession</th>
            <th>Bias for Action</th>
            <th>Ownership</th>
            <th>Insisting on Highest Standards</th>
            <th>Cumulative</th>
          </tr>
          <tr>
            <td>Self</td>
            <td>${performanceMetrics["Customer Obsession"]}</td>
            <td>${performanceMetrics["Bias for Action"]}</td>
            <td>${performanceMetrics["Ownership"]}</td>
            <td>${performanceMetrics["Insisting on Highest Standards"]}</td>
            <td colspan="5">${cumulativeRating}</td>
          </tr>
          <tr>
          <td>Peer Rating</td>
          <td>${parseFloat(ratingsData2.map(res => res["CO_1"])).toFixed(2)}</td>
          <td>${parseFloat(ratingsData2.map(res => res["BA_1"])).toFixed(2)}</td>
          <td>${parseFloat(ratingsData2.map(res => res["Own_1"])).toFixed(2)}</td>
          <td>${parseFloat(ratingsData2.map(res => res["IHS_1"])).toFixed(2)}</td>
          <td>${parseFloat(ratingsData2.map(res => res["PR Total"])).toFixed(2)}</td>
          </tr>
          <tr>
          <td>STL Rating</td>
          <td>${parseFloat(ratingsData2.map(res => res["CO_2"])).toFixed(2)}</td>
          <td>${parseFloat(ratingsData2.map(res => res["BA_2"])).toFixed(2)}</td>
          <td>${parseFloat(ratingsData2.map(res => res["Own_2"])).toFixed(2)}</td>
          <td>${parseFloat(ratingsData2.map(res => res["IHS_2"])).toFixed(2)}</td>
          <td>${parseFloat(ratingsData2.map(res => res["STL Total"])).toFixed(2)}</td>
        </tr>
         
        </table>

        <h4>Final Rating: ${parseFloat(ratingsData2.map(res => res["Final Rating"])).toFixed(2)}</h4>

    <h3 class="rating">Performance Rating Index</h3>
        <table class="bonus">
          <tr>
            <th>Rating</th>
            <th>Meaning</th>
            <th>Performance Bonus %</th>
          </tr>
          <tr>
            <td>1.0</td>
            <td>Poor</td>
            <td>0.0%</td>
          </tr>
          <tr>
            <td>2.0</td>
            <td>Improvement</td>
            <td>0.0%</td>
          </tr>
          <tr>
            <td>3.0</td>
            <td>Good</td>
            <td>10.0%</td>
          </tr>
          <tr>
            <td>3.5</td>
            <td>Good+</td>
            <td>12.5%</td>
          </tr>
          <tr>
            <td>4.0</td>
            <td>Great</td>
            <td>15.0%</td>
          </tr>
          <tr>
            <td>4.5</td>
            <td>Great+</td>
            <td>17.5%</td>
          </tr>
          <tr>
            <td>5.0</td>
            <td>Outstanding</td>
            <td>20.0%</td>
          </tr>
        </table>
        
        <h1 class="_blank">Self Responses:</h1>
        ${selfResponseQuestions
          .map(question => {
            return `
              <h2 class="self-response-heading">${question}</h2>
              <p class="self-responses">${
                question.includes("How would you rate")
                  ? generateStars(selfData[0][question])
                  : selfData[0][question]
              }</p>
            `;
          })
          .join("")}
        
        <h1 class="peer-r">Peer Responses:</h1>
        <style>${cssContent}</style>
       
        ${questionList
          .map(question => {
            let firstProcess = true;
            let count = 0;
            return `
              <h2 class="question-heading">${question}</h2>
              <div class="peer-responses">
                ${userData
                  .map(response => {
                    count = count + 1;
                    const questionResponse = response[question];
                    if (questionResponse !== null && questionResponse !== undefined && questionResponse !== "") {
                      firstProcess = false;
                      const stlPrefix = stlValues.includes(response["Email address"]) ? "("+'<span style="color: blue">STL</span>'+") " : "";
                      return `
                        <p class="peer-response">
                        ${stlPrefix}${response["name"]}: ${
                        question.includes("How would you rate")
                          ? generateStars(questionResponse)
                          : questionResponse
                      }</p>
                      `;
                    }
                    if (firstProcess === true && count === (userData.length -1)){
                      firstProcess = false
                      return '<p class="peer-response"></p>'
                    }
                    return "";
                  })
                  .join("")}
              </div>
            `;
          })
          .join("")}
          
      </body>
      </html>
    `;
    const basePath = "blitz.png";
    await page.setContent(htmlContent, { base: basePath });
    const pdfFileName = `${email}_ANmolPeerResponses.pdf`;
    await page.setContent(htmlContent);
    await page.pdf({
      width:"100%",
      path: pdfFileName,
      format: "A4",
      displayHeaderFooter: true,
      headerTemplate:
        '<div id="header-template"  style="font-size:10px !important; width:100% !important; color:#808080; text-align:center !important;  display:flex !important; justify-content:center !important;"> <div style="width:80% !important; border-bottom:1px solid black !important; text-align:center !important; padding-top:30px; padding-bottom:30px;"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTA5IiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTA5IDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMTIuNzk3MSAxMy41Mzk0TDAgMTcuMDg5N0w4LjY2NTk1IDI0Ljk1ODJMMTIuNzk3MSAyMS45OTY2VjEzLjUzOTRaIiBmaWxsPSIjMjMxRjIwIi8+CjxwYXRoIGQ9Ik04Ljk5NDk4IDI1LjczMkwxMi43OTczIDM3Ljg3NzNWMjIuODk0Nkw4Ljk5NDk4IDI1LjczMloiIGZpbGw9IiMyMzFGMjAiLz4KPHBhdGggZD0iTTM3LjA3NiAxOC45NDQ2QzM5LjY2NzMgMTcuMDcgNDEuMjE4OSAxNC4xNTU4IDQxLjI0MjYgMTAuNzk4NUM0MS4yODE5IDQuODE4MzUgMzYuMzIxOCAwIDMwLjM0MTcgMEgxNi4xMjY5QzE0LjI4NzcgMCAxMi43OTcxIDEuNDkwNiAxMi43OTcxIDMuMzI5NzJWMTMuNTM5NEwyOS44MDYxIDguODIxNUMzMC4yNTMxIDguNjk3NDUgMzAuNTM0NyA5LjI4ODE4IDMwLjE1ODYgOS41NTc5NEwxMi43OTcxIDIxLjk5NjdWMjIuODk0NkwzMC4yMDM5IDEwLjQyNDNDMzAuNTc4IDEwLjE1NjUgMzEuMDQ2NiAxMC42MDc1IDMwLjc5MDcgMTAuOTkxNEwxMi43OTkxIDM3Ljg3NzNDMTIuNzk5MSAzOS4wNDg5IDEzLjc1MDIgNDAgMTQuOTIxOCA0MEgzMC44OTVDMzcuMzMzOSA0MCA0Mi42NDA2IDM0Ljc2NDIgNDIuNTIwNSAyOC4zMjUzQzQyLjQ0NTcgMjQuMzE2MiA0MC40MDM3IDIwLjk2MDkgMzcuMDc3OSAxOC45NDQ2SDM3LjA3NloiIGZpbGw9IiMyMzFGMjAiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik01OS42NTcyIDE0LjgzOUM2MS45NTkxIDE0LjgzOSA2NC4xMTMzIDE1LjcxNTMgNjUuNzI3OSAxNy4zMDQzQzY3LjQ5MjIgMTkuMDQxMSA2OC40NjMgMjEuNDI3NiA2OC40NjMgMjQuMDI0OEM2OC40NjMgMjkuMTQ2NCA2NC43NjUxIDMzLjAwNzggNTkuODY0IDMzLjAwNzhDNTguMjQzNCAzMy4wMDc4IDU2LjYwMTIgMzIuMzkzNCA1NS4zMjEzIDMxLjM1MThWMzIuNjgwOUg1MC4yNzQ2VjcuOTc0ODFINTUuMzE5M1YxNi4zNDU0QzU2LjQxMjIgMTUuNTEyNSA1Ny45MTY2IDE0LjgzOSA1OS42NTcyIDE0LjgzOVpNNTkuNDcyMiAxOS44NjYxQzU3LjIyMzUgMTkuODY2MSA1NS4zMjE0IDIxLjc3MDIgNTUuMzIxNCAyNC4wMjQ4QzU1LjMyMTQgMjUuMDk4IDU1LjczODggMjYuMTAyMiA1Ni40OTg5IDI2Ljg1MDVDNTcuMjM5MyAyNy41NzkgNTguMjIxOCAyNy45ODA3IDU5LjI2NTUgMjcuOTgwN0M2MS41MTYxIDI3Ljk4MDcgNjMuNDE2MyAyNi4wNzY2IDYzLjQxNjMgMjMuODIyQzYzLjQxNjMgMjIuNzQ2OSA2Mi45OTg4IDIxLjc0NDYgNjIuMjM4OCAyMC45OTY0QzYxLjQ5ODQgMjAuMjY3OCA2MC41MTU4IDE5Ljg2NjEgNTkuNDcyMiAxOS44NjYxWiIgZmlsbD0iIzIzMUYyMCIvPgo8cmVjdCB4PSI2OC45MTAyIiB5PSI2Ljk5MjIyIiB3aWR0aD0iNS4wNDQ4IiBoZWlnaHQ9IjI1LjY4NjciIGZpbGw9IiMyMzFGMjAiLz4KPHJlY3QgeD0iNzUuMzgyNSIgeT0iMTUuMTY1OSIgd2lkdGg9IjUuMDQ0OCIgaGVpZ2h0PSIxNy41MTUiIGZpbGw9IiMyMzFGMjAiLz4KPHBhdGggZD0iTTc4LjAwOTQgMTMuNDI1MkM3OS41NjY5IDEzLjQyNTIgODAuNzg3OCAxMi4xOTI2IDgwLjc4OTcgMTAuNjIxM0M4MC43ODk3IDkuODQzNDYgODAuNDYyOSA5LjA3NTUyIDc5Ljg5MTggOC41MTIzNkM3OS4zMjQ3IDcuOTUzMTQgNzguNTgyNCA3LjY0NTk3IDc3LjgwNDYgNy42NDU5N0M3Ni4yNzI3IDcuNjQ1OTcgNzUuMDI2MiA4Ljg4ODQ2IDc1LjAyNjIgMTAuNDE4NEM3NS4wMjYyIDExLjIxMzkgNzUuMzU3IDExLjk5NTcgNzUuOTM0IDEyLjU2MjhDNzYuNDk5MSAxMy4xMiA3Ny4yMzc1IDEzLjQyNTIgNzguMDEzMyAxMy40MjUySDc4LjAwOTRaIiBmaWxsPSIjMjMxRjIwIi8+CjxwYXRoIGQ9Ik04OC44Njg4IDI1LjU2ODZMOTMuMDY0OSAxNS4xNjU5SDg5LjI5MDJWMTAuNzg0N0g4NC4yNDM0VjE1LjE2NTlIODEuMjM2NlYyMC4xOTNIODQuMjQzNFYyNi41MDE5Qzg0LjI0MzQgMjguODg4NSA4NC43NDk1IDMwLjQ5NzIgODUuODM0NCAzMS41NjY0Qzg2LjgxOSAzMi41MzUyIDg4LjI1ODQgMzMuMDA1OCA5MC4yMzczIDMzLjAwNThDOTEuMDkxOSAzMy4wMDU4IDkyLjEgMzIuODkxNiA5Mi44ODE4IDMyLjcxMDVMOTMuMTY5MyAyNi45MTU0SDg5Ljk3MTVDODkuMjc4MyAyNi45MTU0IDg4LjY4OTYgMjYuMTk4NyA4OC44NjY4IDI1LjU2NjZMODguODY4OCAyNS41Njg2WiIgZmlsbD0iIzIzMUYyMCIvPgo8cGF0aCBkPSJNMTA4LjQ5MSAxNS4xNjU5SDk1LjA1MzZMOTQuNDE5NiAyMC44NTQ2SDk4LjY4MjdDOTkuNDU2NSAyMC44NTQ2IDEwMC4wNjEgMjEuNzI4OCA5OS43MjQzIDIyLjM1ODlMOTMuMDQ3MSAzMi42Nzg5SDEwOC4zOFYyNy45MTM3SDEwMi4yMTdMMTA4LjQ4OSAxOC44NzM3VjE1LjE2MzlMMTA4LjQ5MSAxNS4xNjU5WiIgZmlsbD0iIzIzMUYyMCIvPgo8L3N2Zz4K" alt="blitz logo" class="header-logo" style=""/></div></div>',
        footerTemplate: `
        <div style="font-size: 9.5rem; text-align: center; margin-top: 30px; padding-bottom:3.5rem; width:100% !important;">
          <div style="font-weight: bold; color:red; font-size:9.5rem; text-align: center !important; width:100% !important;">PRIVATE &amp; CONFIDENTIAL</div>
        </div>
      `,
        margin: {
          top: '100px',
          bottom: '80px',
          right: '30px',
          left: '30px',
        },
      });
  }
  await browser.close();
})();


// Global variable to use to get data
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

function InitDashboard()
{
    //Initialize the dropdown
    let selector = d3.select("#selDataset");

    //Get a handle to the dropdown
    d3.json(url).then(data => {
        
        //Create a variable to help with for loop and populating the dropdown table
        let sampleNames = data.names;
        
        //For loop to populate dropdown table with subject ids
        for (let i = 0; i < sampleNames.length; i++) {
            let sampleID = sampleNames[i];
            console.log(`Sample ID = ${sampleID}`);
            selector.append("option").text(sampleID);
        }
    });
    // Code provided by Instructor Dom from Homework 14 tutorial
}

InitDashboard();

// Global variable to use to get data
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

function barGraph(sampleID)
{
    console.log(`show barGraph(${sampleID})`);
}

function bubbleGraph(sampleID)
{
    console.log(`show bubbleGraph(${sampleID})`);
}

function metaData(sampleID)
{
    console.log(`show metaData(${sampleID})`);
}

function optionChanged(sampleID)
{
    console.log(`optionChaged: ${sampleID}`);
}

function fillDropdown()
{
    //Initialize the dropdown
    let selector = d3.select("#selDataset");

    //Get a handle to the dropdown
    d3.json(url).then(data => {
        //console.log(`Here's the data:`, data);

        //Create a variable to help with for loop and populating the dropdown table
        let sampleNames = data.names;
        //console.log(`The sample names:`, sampleNames);

        //For loop to populate dropdown table with subject ids
        for (let i = 0; i < sampleNames.length; i++) {
            let sampleID = sampleNames[i];
            console.log(`Sample ID = ${sampleID}`);
            selector.append("option").text(sampleID);
        };
    //Read the current dropdown value
    let initialID = selector.property("value");
    console.log(`initialId = ${initialID}`);

    //Draw a bargraph of the selected value
    barGraph(initialID);
    //Draw a bubble graph of the selected value
    bubbleGraph(initialID);
    //Show meta/demographic data
    metaData(initialID);
    });
    // Code provided by Instructor Dom from Homework 14 tutorial
}






fillDropdown();
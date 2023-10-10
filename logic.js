
$(document).ready(function() {
    var arr=[];
    var addedJob= [];
    var count=0;
    $.getJSON('data.json', function(jsonData) {
        addedJob=jsonData;
        //sortJobs();
        console.log("Added Jobs",addedJob);
        display(jsonData);
    console.log("Jsondata",jsonData);
        $('<div id="addJob"></div>').append("<img src= "+'/images/add.png'+ " alt=Text not found > ").appendTo('.MainBox') ;
      
       
//add tags
$(".MainBox").on("click", ".tagDesign", function() {
    $('.filter').css('box-shadow', '3px 5px 10px 2px rgba(0, 0, 0, 0.2')
    
    console.log("musa");
    console.log('im in tag',count);
    if (count===0){
        $('.filter').append('<label id="clear">clear</label>')
    }
   count++;
    var clickedTagText = $(this).text();
    if (arr.indexOf(clickedTagText) === -1) {
        var filterdiv = $('<div id="filterDiv"></div>');
        var newTag = '<h6 class="filterTag">' + clickedTagText + '</h6>';
        var buttonTag = '<Button class="removeButton">X</Button>';
        
        filterdiv.append(newTag, buttonTag);
        $('.filter').append(filterdiv);
        
        arr.push(clickedTagText);
        filterdata(addedJob);
        console.log('im adding tags',addedJob);
    }
});

//remove tags
$(".filter").on("click", ".removeButton", function(){
   if (arr.length-1===0)
   {
    $('#clear').remove();
    $('.filter').css('box-shadow', 'none')
    console.log('Remove button.index should be 0')
count=0;
   }
 
    $(this).parent().remove();
    console.log('index'+arr.indexOf($(this).prev().text()))
    console.log('lenght'+arr.length)
   arr.splice(arr.indexOf($(this).prev().text()),1);
   console.log('im in remove')
  
   filterdata(addedJob)
   console.log("im removing tags",addedJob);
   
});


function filterdata(data) {
    $('.MainBox').children().not('.filter, #addJob').remove();

    console.log("im in filterdata",data);
    var filtered = data.filter(function(user) {
        var tagsMatch = true;
       // console.log(arr);
        $.each(arr, function(index, chosentag) {
            if (!(user.level === chosentag || user.role === chosentag || (user.tools && user.tools.includes(chosentag))|| (user.languages && user.languages.includes(chosentag)))) {
                tagsMatch = false;
                return false; // Break out of $.each loop
            } 
        });

        return tagsMatch;
    });

    console.log("check", filtered);
    display(filtered);
}
//clear tags
$(".filter").on("click", "#clear", function(){
    
     arr=[];
     console.log('befpre clear count:',count)
     $('.filter').css('box-shadow', 'none')
      $('.filter').children().remove();
      $('.MainBox').children().not('.filter,#addJob').remove();
      count=0;
      console.log('after clear count:',count)
display(addedJob)
console.log("im in clear",addedJob);
           
        });
   
   });

   //remove jobs
$('.MainBox').on("click", ".removeJob", function() {
  
    var jobId = $(this).closest('.developer').data('id'); 
    console.log("jobid",jobId)
    console.log("jobid i want to find",jobId);
    var index = addedJob.findIndex(function(job) {
        return job.id === jobId;
    });
   
    if (index !== -1) {
        addedJob.splice(index, 1);
        console.log("corpesonfingindex i found find",index);
    }
    console.log("Updated addedJob:", addedJob);
    $(this).parent().parent().css("animation","slideinto 0.4s ease-in-out")
   
    let elem = $(this).parent().parent();
    setTimeout( function(){
        elem.remove();
     },400);
    
   
});
    function display(data){
        $.each(data, function(index, user) {
        
           
            var developer=$('<div class="developer"></div>').data('id', user.id);
            var staticInfo=$('<div id="staticInfo"></div>');//main box
            $('<div id="image"></div>').append("<img src=" + user.logo + " alt='Text not found'> ").appendTo(developer) ;
            var companyDiv=$('<div id="company"></div>'); //company div 
           var company = '<label id="companyTag">'+user.company+'</label>';
           if(user.featured==true)
           {
             var featuretag='<label class="topTag1">Featured</label>';
           developer.css('border-left', '6px solid hsl(180, 29%, 50%)');


            }
           if(user.new==true)
           {
            var newtag='<label class="topTag">NEW!</label>';
           }
           companyDiv.append(company,newtag,featuretag)//appending elements in companydiv

           var position='<h3 id="position">'+user.position+'</h3>';//postionelemnet

           var infoDiv=$('<div id="info"></div>'); //info div
           var posted='<h6 class="postedInfo">'+user.postedAt+'</h6>';
           var location='<h6 class="postedInfo ">&#x2022;'+' '+user.location+'</h6>';
           var contract='<h6 class="postedInfo">&#x2022;'+' '+user.contract+'</h6>';
           infoDiv.append(posted,location,contract)//appending elements in infodiv
          staticInfo.append(companyDiv,position,infoDiv)
       
           var tagsDiv = $('<div id="tagDiv"></div>');  //tags div
           tagsDiv.append("<h6 class='tagDesign' >" + user.level + "</h6>");  //appending elements in companydiv

          tagsDiv.append("<h6  class='tagDesign'>" + user.role + "</h6>");
           $.each(user.tools,function(index,tool){   //loop for tool tag
           var tooltag='<h6 class="tagDesign">'+tool+'</h6>';
           tagsDiv.append(tooltag); //appending tags
           });

           $.each(user.languages,function(index,language){   //loop for tool tag
            var languagetag='<h6 class="tagDesign">'+language+'</h6>';
            tagsDiv.append(languagetag); //appending tags
            });

            developer.append(staticInfo,tagsDiv); 
           var removeJobDiv=$('<div id="removeJobDiv"></div>');
            removeJobDiv.append('<Button class="removeJob">X</Button>');
            developer.append(removeJobDiv);
           
            
           
            $('.MainBox').append(developer);
            
        });
       
        
    } 
    $('.MainBox').on('click','#staticInfo,#image',function(){
        Popup();
        });
       
        $('body').on("click", ".popup", function() {
            $(".popup").remove();  
        
        });

        $('.MainBox').on("click","#addJob",function()
        {
           Createform()
        });

      

function Createform() {    
    var formDiv = $('<div class="form"></div>');
    var form = $('<form id="jobForm"></form>'); // made a  form tag with id jobform which is being selected by the form
    
    var name = '<label>Name: </label>';
    var nameInput = '<input type="text" name="company" class="myinput" required />';
    
    var position ='<label>Position: </label>';
    var positionInput ='<input type="text" name="position" class="myinput" required />';
  
    var featuredInput = '<input type="checkbox" id="featured" name="featured">';
    var featuredLabel = '<label class="inlinelabel"">Featured</label>';
    
    var newInput = '<input type="checkbox" id="new" name="new">';
    var newLabel = '<label class="inlinelabel">New</label>';

    var location = '<label>Location: </label>';
    var locationInput = '<input type="text" name="location" class="myinput" required />';
    
    var contractLabel = '<label>Contract: </label>';
    var contract = $('<select id="contract" name="contractType" class="myinput"></select>');
    var options = ['Contract', 'Full time', 'Part time'];
    $.each(options, function(index, value){
        contract.append($('<option>').attr('value', value).text(value));
    });

    var levelLabel = '<label>Level: </label>';
    var levelInput = $('<select id="level" name="level"class="myinput" ></select>');
    var levelOptions = ['Junior', 'Midweight', 'Senior'];
    $.each(levelOptions, function(index, value){
        levelInput.append($('<option>').attr('value', value).text(value));
    });

    var roleLabel = '<label>Role: </label>';
    var roleInput = $('<select id="role" name="role" class="myinput"></select>');
    var roleOptions = ['Frontend', 'Backend', 'Fullstack'];
    $.each(roleOptions, function(index, value){
        roleInput.append($('<option>').attr('value', value).text(value));
    });
    
    

    var submitButton = $('<button type="submit" class="submit">Submit</button>');
    var removeButton = $('<button type="button" id="closeForm">X</button> ');
    var langLabel=$('<label>Languages:</label>');
    form.append(name, nameInput,$('<br>'), 
                position, positionInput,$('<br>'), 
                featuredLabel, featuredInput,$('<br>'),
                newLabel, newInput,$('<br>'), 
                location, locationInput,$('<br>'),
                contractLabel, contract,$('<br>'),
                levelLabel, levelInput,$('<br>'),
                roleLabel, roleInput,$('<br>'),
                submitButton, removeButton,langLabel,$('<br>')); 
  

    var languages = ['Python', 'Ruby', 'JavaScript', 'HTML', 'CSS'];
    $.each(languages, function(index, language) {
        var languageInput = $('<input type="checkbox">').attr({'id': language, 'name': 'languages'});
        var languageLabel = $('<label class="inlinelabel">').text(language);
        form.append(languageInput, languageLabel);  // '<br>' is used to break to the next line after each checkbox.
    });   
    var toolLabel=$('<label>Tool:<label>');
    form.append($('<br>'),toolLabel,$('<br>'))
    var tools = ['React', 'Sass', 'Vue', 'Django', 'RoR'];
    $.each(tools, function(index, tool) {
         var toolInput = $('<input type="checkbox">').attr({'id': tool, 'name': 'tools'});
        var toolLabel = $('<label>').text(tool);
        form.append(toolInput, toolLabel);  // '<br>' is added for a line break after each checkbox.
    });
    var logoUrlLabel = $('<label>Logo URL:</label>');
      var logoUrlInput = '<input type="url" name="logoUrl" class="myinput" required />';

      form.append($('<br>'),logoUrlLabel,logoUrlInput);
    formDiv.append(form);
    $('.MainBox').append(formDiv);
}

$('.MainBox').on('submit', '#jobForm', function(e) {
    e.preventDefault();
    var company = $('input[name="company"]').val();
    var position = $('input[name="position"]').val();
    var isFeatured = $('input[name="featured"]').prop('checked');
    var isNew = $('input[name="new"]').prop('checked');
    var location = $('input[name="location"]').val();
    var contractType = $('#contract').val();
    var level = $('#level').val();
    var role = $('#role').val();
    var posted="Now";
    var selectedLanguages = [];
    var selectedTools = [];
    var logoUrl = $('input[name="logoUrl"]').val();
    
    $('input[name="languages"]:checked').each(function() {
        selectedLanguages.push($(this).attr('id'));
    });
    
    $('input[name="tools"]:checked').each(function() {
        selectedTools.push($(this).attr('id'));
    });

  
    var newJob = {
        company: company,
        position: position,
        featured: isFeatured,
        new: isNew,
        location: location,
        contract: contractType,
        level: level,
        role: role,
        postedAt : posted,
        logo: logoUrl,
        languages: selectedLanguages, 
        tools: selectedTools  
    };

    addedJob.push(newJob);
    $('.form').remove(); 
    $('.MainBox').children().not('#addJob').remove();
  //  sortJobs();
    display(addedJob);
    console.log('jobadded', addedJob);
});

$('.MainBox').on('click', '#closeForm', function() {
    console.log("Close button clicked"); // Add this line
    $('.form').remove();
});




function Popup() {
    var pop = $('<div class="popup"></div>');
    var popcontent= $('<div class="popupcontent"></div>'); 
     var topDiv=$('<div ></div>');
     var topDiv2=$('<div class="popupmainDiv"></div>');
     var logo = "<img src='/images/insure.svg' alt='Text not found' width='20%' height='20%'>"; 


    var aboutTitle = '<h5>About Us</h5>';
    var aboutDesc = '<p>Infinite Solutions is one of the few IT system integration, professional service and software development companies in Macedonia that works with Enterprise systems and companies. As a privately owned company, Infinite Solutions provides IT Consultancy, software design and development as well as professional services and hardware deployment and maintenance</p>';
    topDiv.append(aboutTitle, aboutDesc);

    var descriptionTitle = '<h5>Description</h5>';
    var descriptionContent = '<p>We are looking for a professional Embedded Software Engineer to execute complete embedded software development lifecycle. The goal is to create scalable and optimized software systems.</p>';
   
    topDiv2.append(logo,topDiv)    
    popcontent.append(topDiv2,descriptionTitle, descriptionContent);

    var reponsibilityTitle = '<h5>Responsibilities</h5>';
    var reponsibilityContent = '<ul>' +'<li>Design and implement software of embedded devices and systems from requirements to production and commercial deployment</li>' +
                      '<li>Design, develop, code, test and debug system software</li>' +
                      '<li>Assess third party and open source software...</li>' +
                      '</ul>';
    popcontent.append(reponsibilityTitle, reponsibilityContent);

    var requirmentTitle = '<h5>Requirements</h5>';
    var requiremnetContent = '<ul>' +
                     '<li>Proven working experience in software engineering</li>' +
                     '<li>BS degree in Computer Science or Engineering</li>' +
                     '<li>Experience in hands-on development and troubleshooting on embedded targets....</li>' +
                     '</ul>';
    popcontent.append(requirmentTitle, requiremnetContent);

    var applylink = '<p>If you are interested, <a href="LINK_TO_APPLICATION">Apply for this position</a></p>';
    popcontent.append(applylink);

    pop.append(popcontent);
    $("body").append(pop);
}



/* function sortJobs() {
    addedJob.sort((a, b) => {
        if (a.featured && a.new && (!b.featured || !b.new)) return -1;
        if (!a.featured || !a.new && (b.featured && b.new)) return 1;

        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;

        if (a.new && !b.new) return -1;
        if (!a.new && b.new) return 1;

        return 0;
    });}*/
}); 


$(function(){
    loadRecipies();
    $("#recipes").on("click",".btn-danger",handleDelete);
    $("#recipes").on("click",".btn-warning",handleUpdate);
    $("#addbtn").click(addrecipe);  
    $("#btnsave").click(function() {
        // var id = $("#updateid").val();
        var title = $("#updatetitle").val(response.name);
        var body = $("#updatebody").val(response.price);
        $.ajax({
            url:"hhttps://api-prod-by-ha.herokuapp.com/api/products/"+id,
          
            method:"PUT",
            data : { title, body },
            success:function(response){
                console.log(response)
                loadRecipies();
                $("#updatemodal").modal("hide");
                
        }
    });
 });
})
function addrecipe(){
    var name = $("#title").val();
    var price = $("#body").val();
    $.ajax({
        url:"https://api-prod-by-ha.herokuapp.com/api/products",
        method:"POST",
        data:{name,price},
        success:function(response){
            console.log(response);
            loadRecipies();
        }
    })
}
function handleDelete(){
var btn = $(this);
var parentDiv = btn.closest(".recipe")
let id = parentDiv.attr("data-id");
$.ajax({
    url:"https://api-prod-by-ha.herokuapp.com/api/products/"+id,
    method:"DELETE",
    success:function(){
        loadRecipies();
    }
})
}
function handleUpdate(){
    var btn = $(this);
    var parentDiv = btn.closest(".recipe");
    let id = parentDiv.attr("data-id");
    $.get("https://api-prod-by-ha.herokuapp.com/api/products/"+id,function(response)


    {
        $("#updateid").val(response._id);
        $("#updatetitle").val(response.name);
        $("#updatebody").val(response.price);
        $("#updatemodal").modal("show");

    });
}

function loadRecipies(){
$.ajax({
    url:"https://api-prod-by-ha.herokuapp.com/api/products/",
    method:"GET",
    error:function(response){
        var recipes = $("#recipes");
        recipes.html("An Error has occured");
    },
     success: function(response){
        console.log(response);
        var recipes = $("#recipes");
        recipes.empty();
        for(var i=0;i<response.length;i++){
            var rec = response[i];
           
            // recipes.append(("#heading").${rec.title});
       
        recipes.append(`<div class="recipe" data-id="${rec._id}"><h3>${rec.name}</h3><p><button class="btn btn-danger btn-sm float-right">delete</button><button class="btn btn-warning btn-sm float-right">edit</button>${rec.price}</p></div>`);
        // recipes.append("<div><h3>"+ rec.title +"</h3></div>");
    }
    }
})
} 
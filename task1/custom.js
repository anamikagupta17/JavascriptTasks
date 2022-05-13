fetchProducts();
function fetchProducts(){
fetch('products.json')
	.then(function (response) {
		return response.json();
	}).then(function (data) {
		setProductsDetail(data.products);
	}).catch(function (error) {
		console.log(error);
	});
}
var allItems;
function setProductsDetail(data){
	allItems=data;
	$.each(data,function(i,item)
	{
	var variantLen=item.variants.length;
	var allVariants=item.variants;
	var variants='<br>'
	if(variantLen >1 )
	{ 
		
	   var color=''
	   var x='';
	   var selected='';
	   for(j=0 ;j<variantLen ;j++){
		   color=allVariants[j].option1;
		   if(j==0){selected='checked';}else{selected='';}
		   
	      x +="<input class='form-check-input me-2' type='radio' name='productColor_"+i+"' id='productColor_"+i+"_"+j+"' style=' background-color:"+color+";' value='"+allVariants[j].id+"' "+selected+"  onchange='chnageProductImage("+allVariants[j].id+","+i+","+j+")' >"
		  }
		  variants= "<div class='radioBtn'>"+x+"</div>";
	} 
	$("#products").append("<div class='col-sm-3 p-3 px-2 text-dark'><div class='product-detail'><input type='hidden' id='product_variant_"+i+"' value='0'><img src='"+item.variants[0].featured_image.src+"' class='rounded' alt='"+item.title+"' title='"+item.title+"' width='300' height='236' id='product_img_"+i+"'><div class='d-flex pt-2'>  <div class='pt-2 text-start'>"+item.title+"</div><div class='pt-2 ms-auto'> $ <span id='product_price_"+i+"'> "+item.variants[0].price+"</span></div></div>"+variants+"<div class='d-grid pt-3'><button type='button' class='btn btn-outline-secondary btn-block' onclick='addToCart("+item.id+")'>ADD TO CART</button></div></div></div>");
	});
}



		var cart_items=[];

function addToCart(id){
	var itemCount=parseInt($('#cart').html());
	if(cart_items.indexOf(id) < 0){
	if(itemCount) {
		$('#cart').html(parseInt(itemCount) + 1 );
		$('#itemCount').html(parseInt(itemCount) + 1 );
		}
	else{
		$('#cart').html(1);
		$('#itemCount').html(1);
		}
		
		
			cart_items.push(id);
		}
			else
			{
				alert("already exisitng in cart \n we can add functioanlty to increment the count of product");
			}
		
		$('#cart_items_id').val(cart_items);

}
function checkCart(){
	
	$('.count-input').prop('disabled', true);
	$('#cart_items').empty();
	var items=$('#cart_items_id').val();
	items=items.split(',');
	for(k=0;k<items.length;k++){
	       for(i=0; i<allItems.length ;i++){
			   if(allItems[i].id==items[k]) {
				  var id=k+1;
			        var itemVariant=$('#product_variant_'+i).val();
					var product_color;
					if(itemVariant ==0)
					{
						product_color='';
					}
					else
					{
						product_color ="<p>Color : "+allItems[i].variants[itemVariant].option1+" </p>";;
					}
				   
			       
			     $('#cart_items').append("<div class='row' id='row_of_item_"+id+"'><div class='col-sm-4'><img src='"+allItems[i].variants[itemVariant].featured_image.src+"' alt='"+allItems[i].title+"' title='"+allItems[i].title+"'  width='100' height='100' /><input type='hidden' id='product_id_"+id+"' name='product_id_"+id+"' value='"+allItems[i].id+"'></div><div class='col-sm-5'><h6> "+allItems[i].title+"</h6>"+product_color+"<div class='qtybox'><button type='button' class='btn btn-sm  me-2' id='' onclick='minus("+id+")'>-</button><input type='number' class='count-input' name='qty' id='qty_"+id+"' value='1'><button type='button' class='btn btn-sm ' id='' onclick='plus("+id+")' >+</button></div></div><div class='col-sm-3'><button type='button' class='btn-close' onclick='removeCartItem("+id+")' ></button><br><br><br><h6>$ <span  id='price_"+id+"'> "+allItems[i].variants[itemVariant].price+"</span><input type='hidden' value='"+allItems[i].variants[itemVariant].price+"' id='single_price_"+id+"'><input type='hidden' class='cart_item_price' id='total_amt_"+id+"' value='"+allItems[i].variants[itemVariant].price+"'></h6></div><br><hr/></div>");
			   }
		   }
	}
		
	sum();	
}

function plus(id)
{
	var qty=parseInt($('#qty_'+id).val());
	qty=parseInt(qty + 1)
	var price=$('#single_price_'+id).val();
	$('#qty_'+id).val(qty);
	var final_price=price*qty;
	$('#price_'+id).html(final_price.toFixed(2));
	$('#total_amt_'+id).val(final_price.toFixed(2));
	sum();
}
function minus(id)
{
		var price=$('#single_price_'+id).val();
		var qty=parseInt($('#qty_'+id).val());
	    qty=parseInt(qty - 1)
		if (qty == 0) {
			$('#qty_'+id).val(1);
			$('#price_'+id).html(price);
			$('#total_amt_'+id).val(price);
		}
		else
		{
			$('#qty_'+id).val(qty);
		    var final_price=price*qty;
	        $('#price_'+id).html(final_price.toFixed(2));
	        $('#total_amt_'+id).val(final_price.toFixed(2));
		}
	sum();
}
$(document).ready(function(){
		$('.count-input').prop('disabled', true);
});
var summ;
function sum()
{
	summ=0;
	var collection=$('#cart_items');
	var amounts=collection.find("input[class=cart_item_price]");
	for(var x=0;x<amounts.length;x++)
		{
			var id=amounts[x].id;
			a=$("#"+id).val();
			if(a !='' && a!=0)
			{
				summ=parseFloat(summ)+parseFloat(a);	
			}
		}
		$("#subtotal").html(summ.toFixed(2));	
}

function removeCartItem(ide){
var deletedItem=$('#product_id_'+ide).val();
	$("#row_of_item_"+ide).remove();
	$('#cart').html(parseInt($('#itemCount').html()) - 1 );
	$('#itemCount').html(parseInt($('#itemCount').html()) - 1 );
	if($('#itemCount').html() == 0)
	{
		$('#cart').html('');
	}
	var items=$('#cart_items_id').val();
	items=items.split(',');
	var NewItems = items.filter(e => e != deletedItem);
	 cart_items = cart_items.filter(e => e != deletedItem);
	$('#cart_items_id').empty();
	$('#cart_items_id').val(NewItems)
	
	
		sum();
}

function chnageProductImage(product_id,col_id,var_no){
	$.each(allItems,function(i,item)
	{
	var variantLen=item.variants.length;
	var allVariants=item.variants;
	var variants=''
	if(variantLen >1 )
	{ 
	   for(j=0 ;j<variantLen ;j++){
			   if(allVariants[j].id==product_id) {
				   var dd=allVariants[j];
				   $('#product_price_'+col_id).html(allVariants[j].price);
				   $('#product_img_'+col_id).attr("src",allVariants[j].featured_image.src);
				   $('#product_variant_'+col_id).val(var_no);
			   }
	    }
	}
   });
	}
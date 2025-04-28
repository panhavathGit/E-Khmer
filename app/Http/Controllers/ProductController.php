<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
     // Display a listing of the products
     public function index()
     {
         $products = Product::orderBy('created_at', 'asc')->get();
         return Inertia::render('Products/Index', [
             'products' => $products,
         ]);
     }

     public function dashboard()
     {
         $products = Product::all();
         return Inertia::render('Products/ProductDashboard', [
             'products' => $products,
         ]);
     }
 
     // Store a newly created product in the database
     public function store(Request $request)
     {
         $request->validate([
             'name' => 'required|string',
             'price' => 'required|numeric',
             
         ]);
 
         Product::create($request->all());
 
         return redirect('/products/dashboard');
     }
 
     // Update the specified product in the database
     public function update(Request $request, $id)
     {  
        $product = Product::find($id);

        if ($product) {
            $product->update($request->all());   
        }

        return redirect('/products/dashboard');
     }  
 
     // Remove the specified product from the database
     public function destroy($id)
    {
        // Find the product by ID
        $product = Product::find($id);

        if ($product) {
            $product->delete();
        }

        return redirect('/products/dashboard');
    }

}

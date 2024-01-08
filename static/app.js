// create LI with appropriate value and add it to the UL
function addLI(arrLI) {

    for (let i = 0; i < arrLI.length; i++) {
        $("ul").append(`<li>${arrLI[i].flavor}</li>`);
    }
}

// emptied the input
function emptyInput() {
    $(".i-flavor").val("");
    $(".i-image").val("");
    $(".i-rating").val("");
    $(".i-size").val("");
}

// GET all the cupcakes in the db and add to the DOM's list
async function getCupcakes() {
    const result = await axios.get("http://127.0.0.1:5000/api/cupcakes");

    addLI(result.data.cupcakes);
}

// call the function
getCupcakes();

// get user's inputs
function getInput() {

    let flavor = $(".i-flavor").val();
    let image = !$(".i-image").val().length ? null : $(".i-image").val();
    let rating = $(".i-rating").val();
    let size = $(".i-size").val();

    return { flavor, image, rating: parseFloat(rating), size }
}

// make a POST request to add the cupcake into the db
async function addCupcake(cupcake) {

    const response = await axios({
        method: "POST",
        url: "http://127.0.0.1:5000/api/cupcakes",
        data: cupcake
    });

    return response.data
}

// when user clicks the add button manipulate the DOM and make POST request.
$("form").on("click", "button", function (e) {
    e.preventDefault();
    let cupcake = getInput();

    if (!cupcake.flavor || !cupcake.flavor.match(/^[a-z]+$/i) ||
        !cupcake.rating || !cupcake.size ||
        !cupcake.size.match(/^[a-z]+$/i)) {
        return emptyInput();
    };

    $("ul").append(`<li>${cupcake.flavor}</li>`);

    emptyInput();
    addCupcake(cupcake);
})



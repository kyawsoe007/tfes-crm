<h1>API DOCUMENTATION</h1>

<span>
The TF Energy Services API is organised around REST. Our API has predictable resource-oriented URLs, accepts form-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs. Make sure to configure base api to the below api
</span>

<br/>
<br/>
<h2>BASE URL - http://159.65.14.175:3001/api</h2>
<br/>

<h3>GET - <span>categories/getMegaMenu</span></h3>  

    fields : {
        All: [...],
        BMW: [...],s
        HONDA: [...]
    }

Retrieve all categories and items for megamenu

<br/>


<h3>GET - <span>/products/getMake</span></h3>  

    fields : [
        {
            id: String,
            name: String,
            description: String,
            categoryGroupId: String,
            files : Array <-- thumbnail,
            category: Array,
            product: Array,
        },
        {...},
        {...},
    ]

Retrieve all the makes from the inventory list

<br/>

<h3>GET - <span>/products/getModel</span></h3>  

    fields : [
        {
            id: String,
            name: String,
            description: String,
            categoryGroupId: String,
            categoryGroupId: String,
            files: Array <-- images,
            product: [
                {
                    id: String,
                    name : String,
                    description : String,
                    isActive: Boolean,
                    isFeature: Boolean,
                    categoryGroupId: String,
                    categoryId:	String,
                    cost_Price: String,
                    selling_Price: String,
                    productVariant: Array,
                    productDetailValue: Array,
                    productOption: Array,
                    files : Array <-- thumbnail,

                }
            ]
        },
        {...},
        {...},
    ]

Retrieve all the models from the inventory list

<br/>

<h3>GET - <span>/categories/{id}/category</span></h3>  

    [
        {
            id: String,
            name: String,
            description: String,
            categoryGroupId: String,
            categoryId:	String,
            tagId: String,
            files: Array,
            product: [
                 id: String,
                name : String,
                description : String,
                isActive: Boolean,
                isFeature: Boolean,
                categoryGroupId: String,
                categoryId:	String,
                cost_Price: String,
                selling_Price: String,
                productVariant: Array,
                productDetailValue: Array,
                productOption: Array,
                files : Array <-- thumbnail,

            ]
        },
        {...},
        {...},
    ]

Retrieve all models under a selected make's Id

<br/>

<h3>GET - <span>/categories/{id}</span></h3>  

    {
        id: String,
        name : String,
        description : String,
        files : Array <-- thumbnail,
        header: Array,
        images: Array,
        product : Array
    }

Retrieve a specific model with its information and products

<br/>

<h3>GET - <span>/products/specificGrades/{id}</span></h3>  

    fields : [
        {
            id: String,
            name: String,
            description: String,
            cost_Price: String,
            selling_Price: String,
            engine: object,
            power: object,
            fuel: object,
            files : Array <-- thumbnail,
 
        },
        {...},
        {...},
    ]

Retrieve all grades under a specific model

<br/>

<h3>GET - <span>/products/{id}</span></h3>  

    {
        id: String,
        name : String,
        description : String,
        isActive: Boolean,
        isFeature: Boolean,
        cost_Price: String,
        selling_Price: String,
        productVariant: Array,
        productDetailValue: Array,
        productOption: Array,
        files : Array <-- thumbnail,

    }

Retrieve a specific grade 

<br/>

<h3>GET - <span>/products/specificVariantExterior/{id}</span></h3>  

    fields : {
        String : {
            id: String,
            name: String,
            groupName: String,
            objects: [
                {
                    id: String
                    name: String,
                    price: String,
                    isDefault: String,
                    productId: String,
                    productVariantId: String,
                    files : Array <-- thumbnail,
                    images: Array <-- secondary images
                    stockupdate	: {
                        title: String,
                        description: String
                    }
                }
            ]
        },
        {...},
        {...},
    }

Retrieve dynamic keys and values of the product variant exterior, remember to use dynamic mapping to extract the keys and values, hard coding may produce errors in frontend as admin may change the variants anytime

<br/>

<h3>GET - <span>/products/specificVariantInterior/{id}</span></h3>  

    fields : {
        String : {
            id: String,
            name: String,
            groupName: String,
            objects: [
                {
                    id: String
                    name: String,
                    price: String,
                    isDefault: String,
                    productId: String,
                    productVariantId: String,
                    files : Array <-- thumbnail,
                    images: Array <-- secondary images
                }
            ]
        },
        {...},
        {...},
    }

Retrieve dynamic keys and values of the product variant interior, remember to use dynamic mapping to extract the keys and values, hard coding may produce errors in frontend as admin may change the variants anytime

<br/>

<h3>GET - <span>/products/specificGradeProductOption/{id}</span></h3>  

    fields : {
        String : [
            id: String,
            productOptionId: String
            productId: String
            productOption: {
                id: String,
                name: String,
                price	Number,
                description: String,
                isDefault	Boolean,
                editable	Boolean,
                productOptionCategoryId: String
                type: String,
                value2	String,
                files: Array
            }
        ],
        [...],
        [...],
    }

Retrieve dynamic keys and values of the product options, remember to use dynamic mapping to extract the keys and values, hard coding may produce errors in frontend as admin may change the choices anytime

<br/>

<h3>GET - <span>/products/specificGradeDetail/:id</span></h3>  

    fields : {
        Info : {
            id: String
            name: String
            description: String
            cost_Price	String
            selling_Price	String
        },
        Detail : [
            {
                String : [
                    {
                        id: String,
                        value: String
                        detailCategoryId: String,
                        productId: String,
                        productDetailCategoryId: String,
                        detailCategory: {
                            name: String,
                            unit: String,
                            id: String,
                            productDetailCategoryId: String
                        }
                    },
                    {...}
                ]
            },
            {
                String : [
                    {

                    },
                    {...}
                ]
            },
            {...}
        ]
    }

Retrieve product details and the infomation of the grade - name, description. Use this to get the full information of the product specifications

<br/>

<h3>GET - <span>/tags/getAllTags</span></h3>  

    fields : [
        {
            id: String,
            name: String,
            tags: Number,
        },
        {...},
        {...}
    ]

Retrieve all tags or types of models - etc Sedan, Hatchback, Crossover 

<br/>

<h3>GET - <span>/tags/getAllTagsModels/{id}</span></h3>  

    fields : [
        {
            id: String,
            name: String,
            description: String,
            categoryGroupId: String,
            categoryId: String,
            tagId: String,
            tags: Array,
            files: Array,
            category: Array
            product: [
                {
                    id: String,
                    name : String,
                    description : String,
                    isActive: Boolean,
                    isFeature: Boolean,
                    categoryGroupId: String,
                    categoryId:	String,
                    cost_Price: String,
                    selling_Price: String,
                    productVariant: Array,
                    productDetailValue: Array,
                    productOption: Array,
                    files : Array <-- thumbnail,
                },
                {...},
                {...}
            ]
        },
        {...},
    ]

Retrieve all grades or mixture of grades under the same tag -  etc sedan, hatchback

<br/>

<h3>GET - <span>/products/getAllFeaturedCars</span></h3>  

    fields : [
        {
            id: String,
            name: String,
            modelId: String,
            cost_Price: String,
            selling_Price: String,
            images: Array
            engine: Object : return null if no item found
            fuel: Object : return null if no item found
            power: Object : return null if no item found
        },
        {...},
        {...}
    ]

Retrieve all featured cars in the inventory list set by the admin 

<br/>



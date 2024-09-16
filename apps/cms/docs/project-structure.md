# 🗄️ Project Structure

Generator tool: [File Tree to Text Generator](https://marketplace.visualstudio.com/items?itemName=d-koppenhagen.file-tree-to-text-generator)

## Root folder

```sh
┣ Docker/         # Dockerfiles foldedr
┣ logs/           # Server logs
┣ mysql/          # mysql store
┣ prisma/         # prisma schema and seeding file
┣ node_modules/   # modules store
┣ public/         # public files
┣ scripts/        # include script files
┣ src/            # contain source code
```

## Source folder

```sh
src/
┣ app/            # App Router: define routes and handle metadata
┣ assets/         # store assets, for example: json, style ...
┣ components/     # define all components of the app. Use ReactAdmin framework
┣ consts/         # define app constants
┣ lib/            # re-exporting different libraries preconfigured for the application
┣ middlewares/    # handle middlewares
┣ providers/      # all of the application providers
┣ types/          # base types used across the application
┣ utils/          # shared utility functions includes server actions
┣ views/          # base on ReactAdmin app structure, define Front-end views here. Include CRUD actions
```

## API: Handle API CRUD and all Back-End actions

```sh
src/api/
┣ access/                   # all actions relate to authentication and authorization
┣ animals/                  # define animals route
┣ animal_classifications/   # define animal_classifications route
┣ img_rec_selections/       # define img_rec_selections route
┣ memos/                    # define memos route
┣ products/                 # define products route
┣ product_charts/           # define product_charts route
┣ product_details/          # define product_details route
┣ upload/                   # define upload route to handle upload actions
┣ users/                    # define users route
┣ _auth/                    # Private folder: auth utilities
┣ _controllers/             # Private folder: receive data and return result, status, etc. It follows MVCS pattern
┣ _core/                    # Private folder: define core class
┣ _repos/                   # Private folder: represents the data, database interactions. It follows MVCS pattern, the folder should change to "_models/" after split prisma models. # TODO: Split prisma models
┣ _services/                # Private folder: handle all business logics. It follows MVCS pattern
┣ _uploads/                  # Private folder: store uploaded datas
```

## AdminApp: Define all Frond-End views

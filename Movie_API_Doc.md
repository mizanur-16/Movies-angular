# Movie API Documentation

**`Date : 23/Sep/2023`**

**Note:**

- BASE_URL = `http://localhost:8080`
- Database = `H2 (in-memory)`

---

## 1. Create a new Movie

API: **`{BASE_URL}/api/movies`**  
Method: **`POST`**  
Body: Required

**Request Body:**
```json
{
    "title": "Children of Heaven",
    "description": "A sweet story of a brother and a sister.",
    "releaseYear": 1997,
    "genres": ["family", "compassion"]
}
```

**Response (201 Created):**
```json
{
    "id": 1,
    "title": "Children of Heaven",
    "description": "A sweet story of a brother and a sister.",
    "releaseYear": 1997,
    "genres": ["family", "compassion"]
}
```

## 2. Fetch all movies

API: **`{BASE_URL}/api/movies`**  
Method: **`GET`**  
Body: Not Required  

**Response: (200 OK)**  

```json
[
  {
    "id": 1,
    "title": "Children of Heaven",
    "releaseYear": 1997,
    "description": "A sweet story of a brother and a sister.",
    "genres": [
        "family",
        "compassion"
    ]
  },
  {
    "id": 2,
    "title": "The Message",
    "releaseYear": 1976,
    "description": "History of Phophet Muhammad S.",
    "genres": [
      "history",
      "Islam"
    ]
  }
]
```

## 3. Fetch a Movie Detail

API: **`{BASE_URL}/api/movies/{id}`**  
Method: **`GET`**  
Body: Not Required  

**Response: (200 OK)**  

```json
{
    "id": 1,
    "title": "Children of Heaven",
    "releaseYear": 1997,
    "description": "A sweet story of a brother and a sister.",
    "genres": [
        "family",
        "compassion"
    ]
}
```

## 4. Fetch all Genres

API: **`{BASE_URL}/api/genres`**  
Method: **`GET`**  
Body: Not Required  

**Response: (200 OK)**  

```json
[
    "history",
    "family",
    "compassion"
]
```

---


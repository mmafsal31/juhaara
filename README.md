# Juhaara

Premium jewelry ecommerce platform with a React storefront, owner dashboard, and Django REST backend.

## Stack

- React + Vite + Tailwind CSS
- Framer Motion, React Router, Axios, Recharts, React Icons
- Django + Django REST Framework
- JWT auth, PostgreSQL-ready settings
- Django Channels-ready notification routing

## Quick Start

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Copy `.env.example` to `.env` in `backend/` and set PostgreSQL credentials for production.


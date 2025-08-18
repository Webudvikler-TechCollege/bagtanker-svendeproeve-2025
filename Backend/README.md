# Prisma API Template

Et starterprojekt med **Node.js**, **TypeScript**, **Express 5**, og **Prisma ORM**. Perfekt som udgangspunkt for REST API'er med moderne værktøjer og datamodellering.

---

## 🛠 Teknologier

- [TypeScript](https://www.typescriptlang.org/)
- [Express 5](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [TSX](https://github.com/esbuild-kit/tsx)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [bcrypt](https://www.npmjs.com/package/bcrypt)

---

## Kom i gang

### 1. Klon repo og installér afhængigheder

```bash
git clone https://github.com/dit-brugernavn/api-template.git
cd api-template
npm install
```
### 2. Opret .env-fil ud fra det vedlagte eksempel

```bash
cp .env.example .env
```
### 3. Indsæt dine database oplysninger
I .env fil er der er en DATABASE variabel med en connection string, som er en url. Udskift de enkelte elementer i denne med dine egne oplysninger.
```bash
DATABASE_URL="mysql://[dbuser]:[dbpassword]@[dbhost]:[dbport]/[dbname]"
```
*Husk også at fjerne klammerne ([]).*

### 3.1 Initialiser database med fulde rettigheder
Denne kommando kører med Prisma Migrate og kræver at du har fuld rettighed til din MySQL database. Dette kan typisk bruges hvis du kører med en lokal database.

```bash
npm run init
```
Denne kommando:
- Kører `prisma migrate dev`
- Seeder databasen via `prisma/seed.ts`

### 3.2 Initialiser database med begrænsede rettigheder
Hvis du kun har rettigheder til at administrere tabeller skal du bruge følgende kommando for at oprette tabeller og data.

Denne model skal typisk bruges hvis du kører med en online database.
```bash
npm run push
```
Denne kommando pusher dine datamodeller til databasen og seeder tabellerne med data fra csv

### 4. Start serveren
```bash
npm run dev
```
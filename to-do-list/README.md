# Todo List SPA (React + Vite + Pico.css)

Simple demo todo app with:
- `Due` and `Completed` tabs
- Due date on every todo (defaults to today)
- Strong visual treatment for overdue items
- Persistent local state in `localStorage`

## Run Without Node Installed Locally

### Production-style (Nginx-served static build)
```bash
docker compose up --build app
```

Open: `http://localhost:8080`

### Development mode (Vite HMR in container)
```bash
docker compose --profile dev up dev
```

Open: `http://localhost:5173`

`dev` mounts `./node_modules` from your host, so editor tooling (TS LSP, imports) can resolve packages locally.

## Project Structure

- `src/App.tsx`: App composition, tab logic, sorting, summary stats
- `src/hooks/useTodos.ts`: Typed todo state + persistence + actions
- `src/components/*`: Form, tabs, and list UI components
- `src/styles.css`: Pico.css custom theme and overdue emphasis
- `Dockerfile`: Multi-stage image (`node` build -> `nginx` runtime)
- `docker-compose.yml`: App and dev services

## Notes

- Overdue = todo is in `Due` state and due date is before today.
- Completed items can be moved back into `Due`.

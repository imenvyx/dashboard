## Estrategia de Autenticación Multi-proveedor

### Flujo de Autenticación
1. **Inicio de Sesión Paralelo**:
   - Abrir ventanas emergentes (`window.open()`) para cada proveedor
   - Monitorear estado con `window.addEventListener("message")`
   
2. **Almacenamiento de Tokens**:
   ```ts
   // Ejemplo de almacenamiento seguro
   sessionStorage.setItem("azure_token", encript(token))

3. **Gestión de Tokens**:

 - Refrescar tokens en segundo plano usando setInterval

 - Almacenar refresh tokens en cookies HttpOnly




# Endpoint Test

- React-NextJs-tsx 
- Oauth2 REST API 테스트용.


```bash
npm run dev
```

### Login Page

```
/src
    /login
        /pages.tsx
```

- google login call : `http://localhost:8080/oauth2/code/google`
- kakao login call : `http://localhost:8080/oauth2/code/kakao`
- redirect_uri(auth callback) : `http://localhost:8080/oauth2/code/kakao`
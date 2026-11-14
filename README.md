# Barakah Finance

Personal Islamic finance dashboard, currently implemented through **v1.0**.

## View it on GitHub Pages

Expected project URL:

<https://bc260212477.github.io/Islamic-Financial-Management-System-/>

GitHub Pages is not enabled yet because this repository is private and the current automation token does not have repository-admin permission. To publish it:

1. Open **Settings → Pages** in the repository.
2. Under **Build and deployment**, choose **GitHub Actions**.
3. Approve/run the **Deploy Barakah Finance** workflow if GitHub asks for approval.
4. Open the project URL above after the workflow completes.

The workflow is already committed at `.github/workflows/deploy-pages.yml`; future pushes to `main` will redeploy the site.

## Local preview

From the repository root, run:

```bash
python3 -m http.server 4173
```

Then open <http://127.0.0.1:4173/>.
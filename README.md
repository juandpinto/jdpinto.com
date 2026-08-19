# jdpinto.com

Source for Juan D. Pinto's personal website, built with Hugo and the LoveIt theme.

## Local development

We require Git and Hugo extended `0.165.0`, which matches the version configured for Netlify. Clone with submodules, then start the local server:

```bash
git clone --recurse-submodules https://github.com/juandpinto/jdpinto.com.git
cd jdpinto.com
hugo serve
```

If the repository was cloned without submodules, initialize the theme before building:

```bash
git submodule update --init --recursive
```

The local site is available at <http://localhost:1313>.

## Production build

Build the production site before publishing changes:

```bash
hugo --minify --gc
```

Netlify builds the site with Hugo extended `0.165.0`, as defined in [`netlify.toml`](netlify.toml).

## Theme

LoveIt is a Git submodule pinned to a specific upstream commit. The current pin is on upstream `master` because LoveIt's latest tagged release, `v0.3.1`, is incompatible with Hugo `0.165.0` code-block render hooks. Test a full local build and review the rendered site before updating the submodule.

```bash
git submodule update --init --recursive
hugo --minify --gc
```

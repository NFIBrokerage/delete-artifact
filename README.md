# delete-artifact

A GitHub Action for deleting artifacts.

See also [upload-artifact](https://github.com/actions/upload-artifact) and
[download-artifact](https://github.com/actions/download-artifact).

## Usage

```yml
steps:
- name: Checkout
  uses: actions/checkout@v2

# create your artifact
# ...
# store you artifact:

- name: Store my artifact
  uses: actions/upload-artifact@v1
  with:
    name: my-artifact
    path: path/to/my/artifact.tar.gz

# use that artifact in a later job or step:

- name: Download my artifact
  uses: actions/download-artifact@v1
  with:
    name: my-artifact
    path: ./

# use your artifact
# ...
# clean up that artifact after downloading it

- name: Delete artifact
  uses: NFIBrokerage/delete-artifact@v1
  with:
    name: my-artifact
```

# Kibana Slider Plugin Widget
Splider Plugin Widget for Kibana. 


# Install

```bash
cp -R ./kibana-slider-plugin ./kibana/src/plugins/
```

# Compatibility
Plugins are officialy not supported, because of fast code changes even in minor Versions.

The plugin is 100% compatible with following Versions (other not tested yet):
* kibana (=4.4.1)


# Dev
Clear plugin cache, redeploy and restart

```bash
cd kibana
rm -rf ./optimize/*
cp -R ~/tmp/kibana-slider-plugin ./src/plugins/
bin/kibana
```

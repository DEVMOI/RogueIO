# RogueJS

> A RogueLike Javascript Library/Game Engine built with ❤

<!-- BADGES -->

[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](https://github.com/NodeGG/RogueJS/blob/master/LICENSE) [![Twitter Follow](https://img.shields.io/badge/follow-%40MOIKUNE-blue.svg?style=for-the-badge&logo=twitter)](https://twitter.com/MOIKUNE) [![Discord](https://img.shields.io/discord/160837478004031488?style=for-the-badge&logo=discord)](https://discord.gg/atuZfDJ) [![Reddit](https://img.shields.io/badge/Reddit-Join-blue?style=for-the-badge&logo=reddit)](https://www.reddit.com/r/RogueJS) [![Downloads](https://img.shields.io/github/downloads/NodeGG/RogueJS/total.svg?style=for-the-badge)](https://github.com/NodeGG/RogueJS/releases)

<!-- BADGES END -->

## Introduction
RogueJS is an engine heavily inspired by both Rot.js and KontraJS to the point we merged the two together to create a whole new library for Javascript Game Developers.

### Intended Features

- [ x ] Basic Game Engine

  - Including RNG, FOV, LIGHTING...
  - Pathfinding, and turn scheduling

- [ ] Procedural Map Generation

  - ASCII and Tile Based

- [ x ] Asset Manager

  - A promise based asset loader for loading images, audio, and data files.

- [ x ] Tile Manager

  - For managing and drawing tilesets.

- [ x ] Event Manager

  - A simple event system. Allows you to hook into RogueJS lifecycle events or create your own, i.e Plugins.

- [ x ] Plugin Manager

  - A plugin system based on the interceptor pattern, designed to share reusable code such as more advance collision detection or a 2D physics engine.

- [ x ] Vector Engine

  - The Ability to create simple 2D vector objects

- [ x ] Sprite Engine

  - A versatile way to update and draw your game objects. It can handle simple rectangles, images, and sprite sheet animations. It can be used for your main player object as well as tiny particles in a particle engine.

- [ x ] Pointer Api

  - A simple pointer API. You can use to move the main sprite or respond to a pointer event.(Mouse and touch events.)

- [ x ] Store Manager

  - A Simple Storage API to save data locally or to a Database

- [ x ] A Minimalistic Keyboard Api

- [ x ] Animation Api

- [ ] Basic Multiplayer

### Project Resources That Help Guide the Way

- https://nluqo.github.io/broughlike-tutorial/index.html
- https://www.reddit.com/r/roguelikedev/wiki/python_tutorial_series
- https://straker.github.io/kontra/
- https://ondras.github.io/rot.js/hp/
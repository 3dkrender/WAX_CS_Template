# Contributing to WAX Blockchain Client/Server Template

We love your input! We want to make contributing to this template as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

### Setting up Development Environment

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/yourusername/WAX_CS_Template.git
   cd WAX_CS_Template
   ```
3. Install dependencies:
   ```bash
   # Install client dependencies
   cd Client && npm install

   # Install server dependencies
   cd ../Server && npm install
   ```
4. Set up environment files:
   ```bash
   # Client environment setup
   cp Client/env/.env.example Client/env/.env

   # Server environment setup
   cp Server/.env-cmdrc.example.json Server/.env-cmdrc.json
   ```
5. Start development servers:
   ```bash
   # Start client (in Client directory)
   npm run dev:tlocal

   # Start server (in Server directory)
   npm run dev
   ```

### Making Changes

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes
3. Test your changes
4. Commit your changes:
   ```bash
   git commit -m "feat: add your feature description"
   ```
5. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
6. Create a Pull Request

## Pull Request Process

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code lints
6. Issue that pull request

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for code style changes
- `refactor:` for code refactoring
- `test:` for adding tests
- `chore:` for maintenance tasks

Examples:
```bash
feat: add user authentication
fix: resolve CORS issues
docs: update API documentation
style: format code with prettier
```

## Code Style

- Use TypeScript for all new code
- Follow the existing code style
- Use 2 spaces for indentation
- Use meaningful variable and function names
- Add comments for complex logic
- Write self-documenting code when possible

## Documentation

When contributing, please:

- Update the README.md if needed
- Add JSDoc comments for new functions
- Update API documentation if endpoints change
- Document any new environment variables
- Add inline comments for complex logic

## Testing

- Write unit tests for new features
- Ensure all tests pass before submitting PR
- Include integration tests when needed
- Test in both development and production modes

## Security

- Never commit sensitive data
- Use environment variables for secrets
- Follow security best practices
- Report security vulnerabilities privately

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions or Problems?

- Check existing issues
- Open a new issue if needed
- Join our [Discord](https://discord.gg/3dkrender)
- Follow us on [Twitter](https://twitter.com/3dkrender)

## Additional Resources

- [WAX Developer Portal](https://developer.wax.io/)
- [React Documentation](https://reactjs.org/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

Thank you for contributing to WAX Blockchain Client/Server Template! 
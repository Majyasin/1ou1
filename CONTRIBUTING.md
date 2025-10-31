# Contributing to CodeForge AI

Thank you for your interest in contributing to CodeForge AI! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please be respectful and constructive in your interactions.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/yourusername/codeforge-ai/issues)
2. If not, create a new issue with:
   - Clear, descriptive title
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, browser, versions)

### Suggesting Features

1. Check existing feature requests in Issues
2. Create a new issue with:
   - Clear description of the feature
   - Use cases and benefits
   - Possible implementation approach
   - Examples or mockups if applicable

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the code style guidelines
   - Add tests if applicable
   - Update documentation

4. **Commit your changes**
   ```bash
   git commit -m "feat: add amazing feature"
   ```

   Use conventional commits:
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation changes
   - `style:` Code style changes (formatting, etc.)
   - `refactor:` Code refactoring
   - `test:` Adding tests
   - `chore:` Maintenance tasks

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Describe your changes
   - Reference any related issues
   - Wait for review

## Development Setup

1. **Clone your fork**
   ```bash
   git clone https://github.com/yourusername/codeforge-ai.git
   cd codeforge-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   ```bash
   cp .env.example .env
   # Add your API keys
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## Code Style

- Use TypeScript for all new code
- Follow the existing code style
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused
- Use functional components with hooks

## Testing

- Write tests for new features
- Ensure existing tests pass
- Run tests before submitting PR:
  ```bash
  npm run test
  ```

## Documentation

- Update README.md if adding features
- Add JSDoc comments for functions
- Update API documentation if changing APIs
- Include examples for new features

## Questions?

Feel free to ask questions by:
- Opening a discussion
- Joining our Discord
- Emailing the maintainers

Thank you for contributing to CodeForge AI! 🚀

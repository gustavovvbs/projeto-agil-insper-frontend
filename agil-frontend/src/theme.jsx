import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    heading: `'Kumbh Sans', sans-serif`,
    body: `'Kumbh Sans', sans-serif`,
  },
  colors: {
    brand: {
      darkBg: '#17191C',
      lighterBg: '#27292C',
      accentTeal: '#0E9C8B',
      accentGray: '#4C4F54',
      neonPurple: '#690DDD',
      white: '#FFFFFF',
    },
    glass: {
      bg: 'rgba(255, 255, 255, 0.1)',
      border: 'rgba(255, 255, 255, 0.2)',
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: '500',
        borderRadius: '8px',
      },
      sizes: {
        md: {
          fontSize: '16px',
          padding: '12px 24px',
        },
      },
      variants: {
        solid: (props) => ({
          bg: props.colorScheme === 'brand' ? 'brand.accentTeal' : 'brand.neonPurple',
          color: 'brand.white',
          _hover: {
            bg: props.colorScheme === 'brand' ? 'brand.accentGray' : 'brand.darkBg',
          },
        }),
        outline: {
          borderColor: 'brand.accentTeal',
          color: 'brand.accentTeal',
          _hover: {
            bg: 'brand.glass.bg',
          },
        },
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: '700',
      },
      sizes: {
        lg: {
          fontSize: '32px',
        },
        md: {
          fontSize: '24px',
        },
      },
    },
    Text: {
      baseStyle: {
        fontWeight: '400',
        color: 'brand.white',
      },
    },
    Input: {
      baseStyle: {
        field: {
          bg: 'brand.glass.bg',
          borderRadius: '8px',
          border: '1px solid',
          borderColor: 'brand.glass.border',
          _focus: {
            borderColor: 'brand.accentTeal',
            boxShadow: '0 0 0 3px rgba(14, 156, 139, 0.6)',
          },
        },
      },
    },
    Switch: {
      baseStyle: {
        track: {
          bg: 'brand.glass.border',
          _checked: {
            bg: 'brand.accentTeal',
          },
        },
        thumb: {
          bg: 'brand.white',
        },
      },
    },
    FormLabel: {
      baseStyle: {
        fontWeight: '500',
        color: 'brand.white',
      },
    },
    // Add more component styles as needed
  },
  styles: {
    global: {
      body: {
        bg: 'brand.darkBg',
        color: 'brand.white',
        fontFamily: `'Kumbh Sans', sans-serif`,
      },
    },
  },
})

export default theme
// ProductDetailPage.tsx

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';


interface Product {
  ProductID: number;
  ProductName: string;
  ProductDescription: string;
  ProductStatus: boolean;
  ProductPrice: number;
  ProductImage: string;
}

const DetailPage = () => {
  const route = useRoute();
  const [SIL, setSIL] = useState<Product[]>([]);
  var productId = (route.params as { productId?: number })?.productId ?? null;
  let stockIcon;
  let stockText;
  let stockColor;
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    if (productId !== null) {
      // setSIL("hata yok");
      fetchData();
    }
    else {
      // setSIL("hata var");
    }
  }, [productId]); // Make sure to include categoryId in the dependency array


  const fetchData = async () => {
    try {
      const response = await fetch(`http://192.168.1.154:3000/products/${productId}`);

      if (response.ok) {
        const data = await response.json();
        // setSIL(data.toString());

        setProduct(data[0]);
      } else {
        // setSIL("else içinde");

        console.error('Failed to fetch products');
      }
    } catch (error) {
      // setSIL("catch içinde");
      console.error('API request failed:', error);
    }

  };
  if (product?.ProductStatus == true) {
    stockIcon = 'https://i.pngimg.me/thumb/f/720/m2i8N4d3K9Z5i8N4.jpg';
    stockText = 'In Stock';
    stockColor = '#2FCD71';
  } else {
    stockIcon = 'https://cdn-icons-png.freepik.com/256/6711/6711656.png?semt=ais_hybrid';
    stockText = 'Out of Stock';
  }



  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: product?.ProductImage }}
        style={styles.productImage}
      />
      <Text style={styles.productName}>{product?.ProductName}</Text>

      <Text style={styles.productDescription}>{product?.ProductDescription}</Text>
      <View style={styles.stockContainer}>
        <Text style={styles.stockText}>{stockText}</Text>
        <Image
          source={{ uri: 'https://cdn-icons-png.freepik.com/256/11380/11380143.png?semt=ais_hybrid' }}
          style={styles.stockIcon}
        />
      </View>

      <Text style={styles.productPrice}>Starting from ${product?.ProductPrice}</Text>
      <Image
        source={{ uri: 'https://www.my-furniture.com/media/wysiwyg/asseen/kbbmag-logo.jpg' }}
        style={{ height: 76, width: 190, marginVertical: 20 }}
      />
      <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#737D7E', marginBottom: 15 }}>Services we offer for delievery:</Text>
      <View style={styles.servicesContainer}>
        <Image
          source={{ uri: 'https://www.my-furniture.com/static/version1710221583/frontend/DesignSolutions/mf/en_GB/DesignSolutions_DeliveryReturns/images/paypal-credit-icon.png' }}
          style={styles.stockIcon}
        />
        <Text style={styles.servicesText}>Request Video Call</Text>
      </View>
      <View style={styles.servicesContainer}>
        <Image
          source={{ uri: 'https://www.my-furniture.com/static/version1710221583/frontend/DesignSolutions/mf/en_GB/DesignSolutions_DeliveryReturns/images/video.png' }}
          style={styles.stockIcon}
        />
        <Text style={styles.servicesText}>Free UK Delivery</Text>
      </View>
      <View style={styles.servicesContainer}>
        <Image
          source={{ uri: 'https://www.my-furniture.com/static/version1710221583/frontend/DesignSolutions/mf/en_GB/DesignSolutions_DeliveryReturns/images/time.jpg' }}
          style={styles.stockIcon}
        />
        <Text style={styles.servicesText}>Delivery: 3-6 working days</Text>
      </View>
      <View style={styles.servicesContainer}>
        <Image
          source={{ uri: 'https://www.my-furniture.com/static/version1710221583/frontend/DesignSolutions/mf/en_GB/DesignSolutions_DeliveryReturns/images/truck.jpg' }}
          style={styles.stockIcon}
        />
        <Text style={styles.servicesText}>Request Video Call</Text>
      </View>
      <View style={styles.servicesContainer}>
        <Image
          source={{ uri: 'https://www.my-furniture.com/static/version1710221583/frontend/DesignSolutions/mf/en_GB/DesignSolutions_DeliveryReturns/images/delivery.jpg' }}
          style={styles.stockIcon}
        />
        <Text style={styles.servicesText}>Returns & Refunds</Text>
      </View>

    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    color: '#fff'
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  servicesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  stockText: {
    fontSize: 24,
    color: '#2FCD71',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  servicesText: {
    fontSize: 18,
    color: '#666',
    marginLeft: 10,
    marginTop: 5,
    marginVertical: 10,
  },
  productImage: {
    width: 500,
    height: 250,
    marginBottom: 50,
  },

  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 24,
    color: '#54443d',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  stockIcon: {
    width: 40,
    height: 40,
    marginLeft: 20,
  },
});
export default DetailPage;

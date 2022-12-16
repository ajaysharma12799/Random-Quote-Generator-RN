import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Share,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

const dimension = Dimensions.get('screen');

const App = () => {
  const URL = 'https://api.quotable.io/random';

  const [quote, setQuote] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchRandomQuote = async () => {
    setLoading(true);
    const responseObj = await fetch(URL);
    const data = await responseObj.json();

    setQuote(data);
    setLoading(false);
  };

  const shareRandomQuote = async () => {
    const quoteObj = {
      message: `Hey Checkout this Amazing Quote\n=> ${quote.content}`,
    };

    await Share.share(quoteObj);
  };

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  return (
    <View style={styles.__Container}>
      <StatusBar barStyle={'default'} />
      {loading ? (
        <ActivityIndicator size={'large'} color={'white'} />
      ) : (
        <View style={styles.__QuoteContainer}>
          <Text style={styles.__QuoteContent}>{quote.content}</Text>
          <Text style={styles.__QuoteAuthor}>-- {quote.author}</Text>
        </View>
      )}
      <View>
        <TouchableOpacity
          style={styles.__QuoteButtonContainer}
          onPress={fetchRandomQuote}>
          <Text style={styles.__QuoteButtonText}>Generate Random Quote</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={styles.__QuoteButtonContainer}
          onPress={shareRandomQuote}>
          <Text style={styles.__QuoteButtonText}>Share Quote</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  __Container: {
    flex: 1,
    backgroundColor: '#3944f7',
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  __QuoteContainer: {
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: dimension.height / 5,
    width: dimension.width / 1.1,
  },
  __QuoteContent: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'justify',
  },
  __QuoteAuthor: {
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: 15,
  },
  __QuoteButtonContainer: {
    backgroundColor: 'white',
    borderRadius: 5,
    width: dimension.width / 1.1,
    paddingVertical: 10,
    marginVertical: 10,
  },
  __QuoteButtonText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default App;

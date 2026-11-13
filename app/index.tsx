import { useMemo, useState } from "react";
import { Alert, Image, Linking, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Category = "Garba" | "Cuisine camerounaise";
type Dish = {
  id: string;
  name: string;
  detail: string;
  category: Category;
  categoryLabel: string;
  priceLabel: string;
  priceFrom: number;
  image: any;
};

const categories = ["Tout", "Garba", "Cuisine camerounaise"] as const;
const CUSTOMER_SERVICE_PHONE = "+2250554315148";
const WHATSAPP_URL = "https://wa.me/2250554315148";

const dishes: Dish[] = [
  {
    id: "garba",
    name: "Garba traditionnel",
    detail: "Attiéké, poisson thon et accompagnements",
    category: "Garba",
    categoryLabel: "SPÉCIALITÉ IVOIRIENNE",
    priceLabel: "À partir de 1 000 FCFA",
    priceFrom: 1000,
    image: { uri: "https://loremflickr.com/640/480/garba,attiéké,fish" }
  },
  {
    id: "ndole",
    name: "Ndolé",
    detail: "Feuilles de ndolé, crevettes et accompagnement",
    category: "Cuisine camerounaise",
    categoryLabel: "CUISINE CAMEROUNAISE",
    priceLabel: "3 000 à 4 500 FCFA",
    priceFrom: 3000,
    image: { uri: "https://loremflickr.com/640/480/cameroon,ndole,food" }
  },
  {
    id: "koki",
    name: "Koki",
    detail: "Gâteau de haricots traditionnel, servi avec plantain",
    category: "Cuisine camerounaise",
    categoryLabel: "CUISINE CAMEROUNAISE",
    priceLabel: "3 000 à 4 500 FCFA",
    priceFrom: 3000,
    image: { uri: "https://loremflickr.com/640/480/koki,cameroon,food" }
  },
  {
    id: "taro",
    name: "Taro sauce jaune",
    detail: "Taro accompagné de sa sauce jaune traditionnelle",
    category: "Cuisine camerounaise",
    categoryLabel: "CUISINE CAMEROUNAISE",
    priceLabel: "3 000 à 4 500 FCFA",
    priceFrom: 3000,
    image: { uri: "https://loremflickr.com/640/480/taro,yellow,sauce,food" }
  }
];

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("Tout");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [orderNote, setOrderNote] = useState("");

  const visibleDishes = useMemo(
    () => activeCategory === "Tout" ? dishes : dishes.filter((dish) => dish.category === activeCategory),
    [activeCategory]
  );

  const cartItems = dishes.filter((dish) => (cart[dish.id] ?? 0) > 0);
  const cartCount = Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  const cartMinimum = cartItems.reduce((total, dish) => total + dish.priceFrom * (cart[dish.id] ?? 0), 0);

  const addToCart = (id: string) => {
    setCart((current) => ({ ...current, [id]: (current[id] ?? 0) + 1 }));
  };

  const sendOrderToWhatsApp = () => {
    if (cartItems.length === 0) {
      Alert.alert("Panier vide", "Ajoutez au moins un plat avant de passer commande.");
      return;
    }
    if (!customerName.trim() || !customerPhone.trim() || !deliveryAddress.trim()) {
      Alert.alert("Informations manquantes", "Veuillez renseigner votre nom, votre numéro de téléphone et votre adresse ou quartier.");
      return;
    }

    const lines = cartItems.map((dish) =>
      `• ${dish.name} x${cart[dish.id]} — ${dish.priceLabel}`
    ).join("\\n");
    const message = [
      "Bonjour NL Garba Chic, je souhaite passer cette commande :",
      "",
      lines,
      "",
      `Estimation minimale : ${cartMinimum.toLocaleString("fr-FR")} FCFA`,
      "",
      `Nom : ${customerName.trim()}`,
      `Téléphone : ${customerPhone.trim()}`,
      `Adresse / quartier : ${deliveryAddress.trim()}`,
      orderNote.trim() ? `Précisions : ${orderNote.trim()}` : "",
      "",
      "Merci de me confirmer la disponibilité, le montant définitif et les modalités de livraison."
    ].filter(Boolean).join("\\n");

    Linking.openURL(`https://wa.me/2250554315148?text=${encodeURIComponent(message)}`)
      .catch(() => Alert.alert("Impossible d'ouvrir WhatsApp", "Vous pouvez contacter le service client au +225 05 54 31 51 48."));
  };

  const removeFromCart = (id: string) => {
    setCart((current) => {
      const next = { ...current };
      if ((next[id] ?? 0) <= 1) delete next[id];
      else next[id] -= 1;
      return next;
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#101010" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.logoWrap} accessibilityLabel="NL Garba Chic">
            <Text style={styles.logoText}>NL GARBA CHIC</Text>
            <Text style={styles.logoSub}>SAVEURS & CONVIVIALITÉ</Text>
          </View>
          <TouchableOpacity accessibilityLabel="Ouvrir le panier" style={styles.cartButton} onPress={() => setCartOpen((open) => !open)}>
            <Text style={styles.cartIcon}>PANIER</Text>
            <View style={styles.cartCount}><Text style={styles.cartCountText}>{cartCount}</Text></View>
          </TouchableOpacity>
        </View>

        <View style={styles.hero}>
          <Text style={styles.eyebrow}>LES SAVEURS QUI RASSEMBLENT</Text>
          <Text style={styles.heroTitle}>Le goût du vrai.{"\n"}Le plaisir chez vous.</Text>
          <Text style={styles.heroText}>Retrouvez vos spécialités préférées et commandez simplement depuis Abidjan.</Text>
          <TouchableOpacity style={styles.primaryButton} onPress={() => { setActiveCategory("Tout"); setCartOpen(false); }}>
            <Text style={styles.primaryButtonText}>DÉCOUVRIR LE MENU  →</Text>
          </TouchableOpacity>
          <View style={styles.heroDecor}><Text style={styles.heroDecorText}>NL</Text></View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeading}>
            <View>
              <Text style={styles.kicker}>À LA CARTE</Text>
              <Text style={styles.sectionTitle}>Nos spécialités</Text>
            </View>
            <Text style={styles.seeAll}> {visibleDishes.length} PLATS </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryList}>
            {categories.map((category) => {
              const selected = activeCategory === category;
              return (
                <TouchableOpacity key={category} onPress={() => setActiveCategory(category)} style={[styles.category, selected && styles.categoryActive]}>
                  <Text style={[styles.categoryText, selected && styles.categoryTextActive]}>{category}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {visibleDishes.map((dish) => (
            <View key={dish.id} style={styles.dishCard}>
              {dish.image ? (
                <Image source={dish.image} style={styles.dishPhoto} resizeMode="cover" accessibilityLabel={dish.name} />
              ) : (
                <View style={styles.dishArtwork}><Text style={styles.dishArtworkText}>NL</Text></View>
              )}
              <View style={styles.dishInfo}>
                <Text style={styles.dishCategory}>{dish.categoryLabel}</Text>
                <Text style={styles.dishName}>{dish.name}</Text>
                <Text style={styles.dishDetail}>{dish.detail}</Text>
                <Text style={styles.dishPrice}>{dish.priceLabel}</Text>
                <TouchableOpacity onPress={() => addToCart(dish.id)} style={styles.addButton}>
                  <Text style={styles.addButtonText}>AJOUTER AU PANIER  +</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {cartOpen && (
          <View style={styles.cartPanel}>
            <View style={styles.cartHeading}>
              <Text style={styles.cartTitle}>Votre panier</Text>
              <TouchableOpacity onPress={() => setCartOpen(false)}><Text style={styles.closeCart}>FERMER ✕</Text></TouchableOpacity>
            </View>
            {cartItems.length === 0 ? (
              <Text style={styles.emptyCart}>Votre panier est vide. Ajoutez un plat pour commencer.</Text>
            ) : (
              <>
                {cartItems.map((dish) => (
                  <View key={dish.id} style={styles.cartLine}>
                    <View style={styles.cartLineInfo}>
                      <Text style={styles.cartDishName}>{dish.name}</Text>
                      <Text style={styles.cartDishPrice}>{dish.priceLabel}</Text>
                    </View>
                    <View style={styles.quantityControls}>
                      <TouchableOpacity style={styles.quantityButton} onPress={() => removeFromCart(dish.id)}><Text style={styles.quantityText}>−</Text></TouchableOpacity>
                      <Text style={styles.quantityValue}>{cart[dish.id]}</Text>
                      <TouchableOpacity style={styles.quantityButton} onPress={() => addToCart(dish.id)}><Text style={styles.quantityText}>+</Text></TouchableOpacity>
                    </View>
                  </View>
                ))}
                <Text style={styles.cartEstimate}>Estimation minimale : {cartMinimum.toLocaleString("fr-FR")} FCFA</Text>
                <Text style={styles.cartNotice}>Le total définitif dépendra de la portion choisie. Les frais et modalités de livraison seront confirmés par le service client.</Text>
                <Text style={styles.orderFormTitle}>Vos coordonnées</Text>
                <TextInput value={customerName} onChangeText={setCustomerName} placeholder="Votre nom complet" placeholderTextColor="#8C877D" style={styles.orderInput} />
                <TextInput value={customerPhone} onChangeText={setCustomerPhone} placeholder="Votre numéro de téléphone" placeholderTextColor="#8C877D" keyboardType="phone-pad" style={styles.orderInput} />
                <TextInput value={deliveryAddress} onChangeText={setDeliveryAddress} placeholder="Commune, quartier et adresse de livraison" placeholderTextColor="#8C877D" style={styles.orderInput} />
                <TextInput value={orderNote} onChangeText={setOrderNote} placeholder="Précisions (facultatif)" placeholderTextColor="#8C877D" multiline style={[styles.orderInput, styles.orderNoteInput]} />
                <TouchableOpacity style={styles.orderButton} onPress={sendOrderToWhatsApp}>
                  <Text style={styles.orderButtonText}>ENVOYER LA COMMANDE SUR WHATSAPP</Text>
                </TouchableOpacity>
                <Text style={styles.cartNotice}>Votre commande sera envoyée au +225 05 54 31 51 48. Elle ne sera confirmée qu'après validation par NL Garba Chic.</Text>
              </>
            )}
          </View>
        )}

        <View style={styles.delivery}>
          <Text style={styles.deliveryKicker}>NL GARBA CHIC À ABIDJAN</Text>
          <Text style={styles.deliveryTitle}>Vos envies, notre cuisine.</Text>
          <Text style={styles.deliveryText}>Commandes et service client : {CUSTOMER_SERVICE_PHONE}. Contactez-nous pour confirmer votre commande, les portions et la livraison.</Text>
          <TouchableOpacity style={styles.primaryButton} onPress={() => Linking.openURL(WHATSAPP_URL)}><Text style={styles.primaryButtonText}>COMMANDER SUR WHATSAPP  →</Text></TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerBrand}>NL GARBA CHIC</Text>
          <Text style={styles.footerText}>Une expérience gourmande signée NLAcademy.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F7F5F0" },
  header: { backgroundColor: "#101010", paddingHorizontal: 18, paddingTop: 4, paddingBottom: 4, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  logoWrap: { width: 174, height: 76, marginLeft: -10, justifyContent: "center" },
  logoText: { color: "#D6A84B", fontSize: 19, fontWeight: "900", letterSpacing: 1.2 },
  logoSub: { color: "#C9C4BA", fontSize: 7, fontWeight: "800", letterSpacing: 1.5, marginTop: 5 },
  cartButton: { borderWidth: 1, borderColor: "#51432B", borderRadius: 20, paddingHorizontal: 13, paddingVertical: 9, flexDirection: "row", alignItems: "center", gap: 8 },
  cartIcon: { color: "#FFFFFF", fontSize: 9, fontWeight: "800", letterSpacing: 1 },
  cartCount: { backgroundColor: "#D6A84B", borderRadius: 10, width: 19, height: 19, alignItems: "center", justifyContent: "center" },
  cartCountText: { color: "#101010", fontSize: 10, fontWeight: "900" },
  hero: { backgroundColor: "#171717", paddingHorizontal: 24, paddingTop: 42, paddingBottom: 38, overflow: "hidden" },
  eyebrow: { color: "#D6A84B", fontSize: 10, fontWeight: "800", letterSpacing: 2 },
  heroTitle: { color: "#FFFFFF", fontSize: 35, lineHeight: 42, fontWeight: "900", marginTop: 17, maxWidth: 300 },
  heroText: { color: "#C9C4BA", fontSize: 13, lineHeight: 21, marginTop: 13, maxWidth: 300 },
  primaryButton: { backgroundColor: "#D6A84B", alignSelf: "flex-start", paddingHorizontal: 17, paddingVertical: 14, borderRadius: 4, marginTop: 23 },
  primaryButtonText: { color: "#171717", fontSize: 10, fontWeight: "900", letterSpacing: 0.8 },
  heroDecor: { position: "absolute", right: -23, bottom: -44, borderWidth: 1, borderColor: "#3B3325", borderRadius: 100, width: 190, height: 190, alignItems: "center", justifyContent: "center" },
  heroDecorText: { color: "#29251E", fontSize: 78, fontWeight: "900" },
  section: { paddingHorizontal: 20, paddingTop: 30, paddingBottom: 28 },
  sectionHeading: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" },
  kicker: { color: "#B18A3C", fontSize: 9, fontWeight: "900", letterSpacing: 2 },
  sectionTitle: { color: "#191919", fontSize: 25, fontWeight: "900", marginTop: 5 },
  seeAll: { color: "#8A6B32", fontSize: 9, fontWeight: "900", letterSpacing: 1 },
  categoryList: { gap: 8, paddingVertical: 19 },
  category: { borderWidth: 1, borderColor: "#DED9CE", borderRadius: 22, paddingHorizontal: 15, paddingVertical: 10 },
  categoryActive: { backgroundColor: "#171717", borderColor: "#171717" },
  categoryText: { color: "#615D55", fontSize: 11, fontWeight: "700" },
  categoryTextActive: { color: "#FFFFFF" },
  dishCard: { backgroundColor: "#FFFFFF", borderRadius: 9, marginBottom: 12, padding: 11, flexDirection: "row", gap: 14, elevation: 1 },
  dishArtwork: { width: 104, height: 112, borderRadius: 6, backgroundColor: "#211E18", alignItems: "center", justifyContent: "center" },
  dishPhoto: { width: 104, height: 112, borderRadius: 6, backgroundColor: "#E8E1D5" },
  dishArtworkText: { color: "#D6A84B", fontSize: 30, fontWeight: "900", letterSpacing: 2 },
  dishInfo: { flex: 1, justifyContent: "center", paddingVertical: 4 },
  dishCategory: { color: "#B18A3C", fontSize: 8, fontWeight: "900", letterSpacing: 1 },
  dishName: { color: "#1B1B1B", fontSize: 16, fontWeight: "900", marginTop: 7 },
  dishDetail: { color: "#77736B", fontSize: 10, lineHeight: 15, marginTop: 4 },
  dishPrice: { color: "#171717", fontSize: 11, fontWeight: "900", marginTop: 7 },
  addButton: { alignSelf: "flex-start", backgroundColor: "#171717", borderRadius: 4, paddingHorizontal: 10, paddingVertical: 8, marginTop: 9 },
  addButtonText: { color: "#D6A84B", fontSize: 8, fontWeight: "900", letterSpacing: 0.5 },
  cartPanel: { marginHorizontal: 20, marginBottom: 22, padding: 17, backgroundColor: "#FFFFFF", borderRadius: 9, borderWidth: 1, borderColor: "#E7E0D3" },
  cartHeading: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  cartTitle: { color: "#191919", fontSize: 20, fontWeight: "900" },
  closeCart: { color: "#8A6B32", fontSize: 9, fontWeight: "900" },
  emptyCart: { color: "#77736B", fontSize: 12, lineHeight: 19 },
  cartLine: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 11, borderBottomWidth: 1, borderBottomColor: "#EEEAE2" },
  cartLineInfo: { flex: 1, paddingRight: 8 },
  cartDishName: { color: "#191919", fontSize: 13, fontWeight: "800" },
  cartDishPrice: { color: "#77736B", fontSize: 10, marginTop: 4 },
  quantityControls: { flexDirection: "row", alignItems: "center", gap: 10 },
  quantityButton: { width: 27, height: 27, borderRadius: 14, backgroundColor: "#F0E9DB", alignItems: "center", justifyContent: "center" },
  quantityText: { color: "#171717", fontSize: 17, fontWeight: "800" },
  quantityValue: { color: "#171717", fontSize: 13, fontWeight: "900" },
  orderFormTitle: { color: "#191919", fontSize: 15, fontWeight: "900", marginTop: 20, marginBottom: 9 },
  orderInput: { borderWidth: 1, borderColor: "#DED9CE", borderRadius: 6, backgroundColor: "#FAF9F6", paddingHorizontal: 12, paddingVertical: 11, color: "#191919", fontSize: 12, marginTop: 8 },
  orderNoteInput: { minHeight: 74, textAlignVertical: "top" },
  orderButton: { backgroundColor: "#1F8F50", borderRadius: 5, paddingHorizontal: 13, paddingVertical: 15, alignItems: "center", marginTop: 13 },
  orderButtonText: { color: "#FFFFFF", fontSize: 10, fontWeight: "900", letterSpacing: 0.4 },
  cartEstimate: { color: "#171717", fontSize: 13, fontWeight: "900", marginTop: 14 },
  cartNotice: { color: "#77736B", fontSize: 10, lineHeight: 16, marginTop: 7 },
  delivery: { marginHorizontal: 20, backgroundColor: "#EDE7D9", borderRadius: 8, padding: 22, marginBottom: 25 },
  deliveryKicker: { color: "#99752F", fontSize: 9, fontWeight: "900", letterSpacing: 1.5 },
  deliveryTitle: { color: "#1A1A1A", fontSize: 21, fontWeight: "900", marginTop: 9 },
  deliveryText: { color: "#686257", fontSize: 11, lineHeight: 18, marginTop: 8 },
  footer: { backgroundColor: "#101010", padding: 24, alignItems: "center" },
  footerBrand: { color: "#D6A84B", fontWeight: "900", letterSpacing: 2, fontSize: 13 },
  footerText: { color: "#A7A197", fontSize: 10, marginTop: 7 }
});

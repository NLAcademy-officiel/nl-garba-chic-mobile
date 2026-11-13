import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const categories = ["Tout", "Garba", "Cuisine camerounaise", "Boissons"];

const dishes = [
  { name: "Garba traditionnel", detail: "Attiéké, poisson thon et accompagnements", category: "INCONTOURNABLE", price: "À partir de 1 000 FCFA", image: null },
  { name: "Ndolé", detail: "Feuilles de ndolé, crevettes et accompagnement", category: "CUISINE CAMEROUNAISE", price: "3 000 à 4 500 FCFA", image: require("../assets/images/dishes/ndole.jpg") },
  { name: "Koki", detail: "Gâteau de haricots traditionnel, servi avec plantain", category: "CUISINE CAMEROUNAISE", price: "3 000 à 4 500 FCFA", image: require("../assets/images/dishes/koki.jpg") },
  { name: "Taro sauce jaune", detail: "Taro accompagné de sa sauce jaune traditionnelle", category: "CUISINE CAMEROUNAISE", price: "3 000 à 4 500 FCFA", image: require("../assets/images/dishes/taro-sauce-jaune.jpg") }
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#101010" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Image
            source={require("../assets/images/nl-garba-chic-logo.jpg")}
            style={styles.logo}
            resizeMode="contain"
            accessibilityLabel="Logo officiel NL Garba Chic"
          />
          <TouchableOpacity accessibilityLabel="Ouvrir le panier" style={styles.cartButton}>
            <Text style={styles.cartIcon}>PANIER</Text>
            <View style={styles.cartCount}><Text style={styles.cartCountText}>0</Text></View>
          </TouchableOpacity>
        </View>

        <View style={styles.hero}>
          <Text style={styles.eyebrow}>LES SAVEURS QUI RASSEMBLENT</Text>
          <Text style={styles.heroTitle}>Le goût du vrai.{ "\n" }Le plaisir chez vous.</Text>
          <Text style={styles.heroText}>Retrouvez vos spécialités préférées et commandez simplement depuis Abidjan.</Text>
          <TouchableOpacity style={styles.primaryButton} onPress={() => {}}>
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
            <Text style={styles.seeAll}>VOIR TOUT</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryList}>
            {categories.map((category, index) => (
              <TouchableOpacity key={category} style={[styles.category, index === 0 && styles.categoryActive]}>
                <Text style={[styles.categoryText, index === 0 && styles.categoryTextActive]}>{category}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {dishes.map((dish) => (
            <TouchableOpacity key={dish.name} style={styles.dishCard} activeOpacity={0.85}>
              {dish.image ? (
                <Image source={dish.image} style={styles.dishPhoto} resizeMode="cover" accessibilityLabel={dish.name} />
              ) : (
                <View style={styles.dishArtwork}>
                  <Text style={styles.dishArtworkText}>NL</Text>
                </View>
              )}
              <View style={styles.dishInfo}>
                <Text style={styles.dishCategory}>{dish.category}</Text>
                <Text style={styles.dishName}>{dish.name}</Text>
                <Text style={styles.dishDetail}>{dish.detail}</Text>
                <Text style={styles.dishPrice}>{dish.price}</Text>
                <Text style={styles.dishAction}>DÉCOUVRIR  →</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.delivery}>
          <Text style={styles.deliveryKicker}>NL GARBA CHIC À ABIDJAN</Text>
          <Text style={styles.deliveryTitle}>Vos envies, notre cuisine.</Text>
          <Text style={styles.deliveryText}>Les modalités de livraison et de commande seront précisées avant la validation de votre panier.</Text>
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
  logo: { width: 174, height: 116, marginLeft: -10 },
  brand: { color: "#FFFFFF", fontSize: 19, fontWeight: "900", letterSpacing: 1.2 },
  brandGold: { color: "#D6A84B" },
  tagline: { color: "#B8B3A9", fontSize: 8, letterSpacing: 1.15, marginTop: 5 },
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
  dishAction: { color: "#8A6B32", fontSize: 9, fontWeight: "900", letterSpacing: 0.8, marginTop: 9 },
  delivery: { marginHorizontal: 20, backgroundColor: "#EDE7D9", borderRadius: 8, padding: 22, marginBottom: 25 },
  deliveryKicker: { color: "#99752F", fontSize: 9, fontWeight: "900", letterSpacing: 1.5 },
  deliveryTitle: { color: "#1A1A1A", fontSize: 21, fontWeight: "900", marginTop: 9 },
  deliveryText: { color: "#686257", fontSize: 11, lineHeight: 18, marginTop: 8 },
  footer: { backgroundColor: "#101010", padding: 24, alignItems: "center" },
  footerBrand: { color: "#D6A84B", fontWeight: "900", letterSpacing: 2, fontSize: 13 },
  footerText: { color: "#A7A197", fontSize: 10, marginTop: 7 }
});